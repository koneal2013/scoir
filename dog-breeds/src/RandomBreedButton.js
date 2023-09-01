import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { RandomBreedButtonContainer } from './styles';

function RandomBreedButton() {
    const dispatch = useDispatch();

    const handleClick = () => {
        axios
            .get('https://dog.ceo/api/breeds/image/random')
            .then((response) => {
                const imageUrl = response.data.message;
                const breed = imageUrl.split('/')[4];
                dispatch({ type: 'ADD_BREED', payload: breed });
            })
            .catch((error) => {
                console.error('Error fetching random breed:', error);
            });
    };

    return (
        <RandomBreedButtonContainer>
            <button onClick={handleClick}>Catch A Random Breed</button>
        </RandomBreedButtonContainer>
    );
}

export default RandomBreedButton;