import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BreedItemContainer, BreedImage, BreedName, DeleteButton } from './styles';

function BreedItem({ breed }) {
    let imageUrl;
        axios
            .get(`/api/breed/${breed}/images/random`)
            .then((response) => {
                imageUrl = response.data.message;
            })
            .catch((error) => {
                console.error('Error fetching breed image:', error);
            });

    const handleDelete = () => {
       // dispatch({ type: 'REMOVE_BREED', payload: index });
    };

    return (
        <BreedItemContainer>
            {imageUrl && <BreedImage src={imageUrl} alt={breed} />}
            <BreedName>{breed}</BreedName>
            <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
        </BreedItemContainer>
    );
}

export default BreedItem;