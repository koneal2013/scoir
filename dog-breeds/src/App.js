import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';
import SearchBar from './SearchBar';
import RandomBreedButton from './RandomBreedButton';
import CaughtBreeds from './CaughtBreeds';
import ClearAllButton from './ClearAllButton';
import { Container, LogoutButton } from './styles';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [registering, setRegistering] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
    };

    if (!loggedIn) {
        return registering ? (
            <Register onRegister={() => setRegistering(false)} />
        ) : (
            <Login onLogin={() => setLoggedIn(true)} />
        );
    }

    return (
        <Container>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            <SearchBar />
            <RandomBreedButton />
            <CaughtBreeds />
            <ClearAllButton />
        </Container>
    );
}

export default App;