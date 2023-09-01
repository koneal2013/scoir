import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { BreedItemContainer, BreedImage, BreedName, DeleteButton } from './styles';

function BreedItem({ breed, index }) {
    const [imageUrl, setImageUrl] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        axios
            .get(`https://dog.ceo/api/breed/${breed}/images/random`)
            .then((response) => {
                setImageUrl(response.data.message);
            })
            .catch((error) => {
                console.error('Error fetching breed image:', error);
            });
    }, [breed]);

    const handleDelete = () => {
        dispatch({ type: 'REMOVE_BREED', payload: index });
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