package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type User struct {
	ID       uint   `gorm:"primaryKey"`
	Username string `gorm:"unique"`
	Password string
}

type DogCard struct {
	ID     uint `gorm:"primaryKey"`
	Breed  string
	Image  string
	UserID uint
}

var db *gorm.DB

func main() {
	// Initialize the database connection
	dsn := "host=postgres user=postgres password=your_password dbname=dog_catcher port=5432 sslmode=disable TimeZone=UTC"
	var err error
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to the database:", err)
	}

	// Migrate the schema
	err = db.AutoMigrate(&User{}, &DogCard{})
	if err != nil {
		log.Fatal("unable to create db schema", err)
	}

	// Create a new router
	r := mux.NewRouter()

	// Define the routes
	r.HandleFunc("/register", registerHandler).Methods(http.MethodPost)
	r.HandleFunc("/login", loginHandler).Methods(http.MethodPost)
	r.HandleFunc("/dogcards", withAuth(createDogCardHandler)).Methods(http.MethodPost)
	r.HandleFunc("/dogcards", withAuth(getDogCardsHandler)).Methods(http.MethodGet)

	// Add CORS middleware
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:*"},
		AllowCredentials: true,
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
	})
	handler := c.Handler(r)

	// Start the server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Listening on port %s...", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}

func registerHandler(w http.ResponseWriter, r *http.Request) {
	// Parse the request body
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Failed to hash password", http.StatusInternalServerError)
		return
	}
	user.Password = string(hashedPassword)

	// Save the user to the database
	if err := db.Create(&user).Error; err != nil {
		http.Error(w, "user already exists", http.StatusConflict)
		return
	}

	// Return the created user
	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(user)
	if err != nil {
		http.Error(w, "unable to encode user", http.StatusInternalServerError)
	}
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	// Parse the request body
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Find the user in the database
	var dbUser User
	db.Where("username = ?", user.Username).First(&dbUser)

	// Compare the hashed password with the provided password
	err = bcrypt.CompareHashAndPassword([]byte(dbUser.Password), []byte(user.Password))
	if err != nil {
		http.Error(w, "Invalid username or password", http.StatusUnauthorized)
		return
	}

	// Create a new JWT token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userid": dbUser.ID,
		"exp":    time.Now().Add(time.Hour * 24).Unix(),
	})

	// Sign the token with a secret key
	secretKey := "your_secret_key"
	tokenString, err := token.SignedString([]byte(secretKey))
	if err != nil {
		http.Error(w, "Failed to generate token", http.StatusInternalServerError)
		return
	}

	// Return the token
	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(map[string]string{
		"token": tokenString,
	})
	if err != nil {
		http.Error(w, "unable to encode jwt token", http.StatusInternalServerError)
	}
}

func createDogCardHandler(w http.ResponseWriter, r *http.Request) {
	// Parse the request body
	var dogCard DogCard
	err := json.NewDecoder(r.Body).Decode(&dogCard)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Set the user ID from the JWT token
	claims := r.Context().Value("claims").(jwt.MapClaims)
	dogCard.UserID = uint(claims["userid"].(float64))

	// Save the dog card to the database
	db.Create(&dogCard)

	// Return the created dog card
	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(dogCard)
	if err != nil {
		http.Error(w, "unable to encode dog card", http.StatusInternalServerError)
	}
}

func getDogCardsHandler(w http.ResponseWriter, r *http.Request) {
	// Get the user ID from the JWT token
	claims := r.Context().Value("claims").(jwt.MapClaims)
	userID := uint(claims["userid"].(float64))

	// Fetch the dog cards from the database
	var dogCards []DogCard
	db.Where("user_id = ?", userID).Order("id desc").Find(&dogCards)

	// Return the dog cards
	w.Header().Set("Content-Type", "application/json")
	err := json.NewEncoder(w).Encode(dogCards)
	if err != nil {
		http.Error(w, "unable to encode dog card", http.StatusInternalServerError)
	}
}

func withAuth(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get the JWT token from the Authorization header
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
			return
		}

		// Parse the JWT token
		tokenString := authHeader[len("Bearer "):]
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return []byte("your_secret_key"), nil
		})

		// Check if the token is valid
		if err != nil || !token.Valid {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		// Call the next handler with the JWT claims in the context
		ctx := r.Context()
		ctx = context.WithValue(ctx, "claims", token.Claims)
		next.ServeHTTP(w, r.WithContext(ctx))
	}
}
