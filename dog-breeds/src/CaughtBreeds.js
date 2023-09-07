import React from 'react';
import { useSelector } from 'react-redux';
import BreedItem from './BreedItem';
import { CaughtBreedsContainer, Title, List, EmptyMessage } from './styles';
import axios from "axios";

function CaughtBreeds() {
    const caughtBreeds = useSelector((state) => state.caughtBreeds);
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return (
        <CaughtBreedsContainer>
            <Title>Caught Breeds</Title>
            {caughtBreeds.length === 0 ? (
                <EmptyMessage>There are currently no breeds caught. Search above to catch some!</EmptyMessage>
            ) : (
                <List>
                    {caughtBreeds.map((breed, index) => (
                        <BreedItem key={index} breed={breed} index={index} />
                    ))}
                </List>
            )}
        </CaughtBreedsContainer>
    );
}

export default CaughtBreeds;