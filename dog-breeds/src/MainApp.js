import React from 'react';
import SearchBar from './SearchBar';
import RandomBreedButton from './RandomBreedButton';
import CaughtBreeds from './CaughtBreeds';
import ClearAllButton from './ClearAllButton';
import { Container } from './styles';

function MainApp({ onLogout }) {
    return (
        <Container>
            <SearchBar />
            <RandomBreedButton />
            <CaughtBreeds />
            <ClearAllButton />
            <button onClick={onLogout}>Logout</button>
        </Container>
    );
}

export default MainApp;