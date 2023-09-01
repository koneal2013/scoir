// App.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Login from './Login';
import SearchBar from './SearchBar';
import RandomBreedButton from './RandomBreedButton';
import CaughtBreeds from './CaughtBreeds';
import ClearAllButton from './ClearAllButton';
import { Container, LogoutButton } from './styles';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const caughtBreeds = useSelector((state) => state.caughtBreeds);

    const handleLogout = () => {
        setLoggedIn(false);
    };

    if (!loggedIn) {
        return <Login onLogin={() => setLoggedIn(true)} />;
    }

    return (
        <Container>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            <SearchBar />
            <RandomBreedButton />
            <CaughtBreeds caughtBreeds={caughtBreeds} />
            <ClearAllButton />
        </Container>
    );
}

export default App;