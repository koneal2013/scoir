import React from 'react';
import BreedItem from './BreedItem';
import { CaughtBreedsContainer, List, ListItem, Title } from './styles';

function CaughtBreeds({ caughtBreeds }) {
    return (
        <CaughtBreedsContainer>
            <Title>Caught Breeds</Title>
            {caughtBreeds.length === 0 ? (
                <p>There are currently no breeds caught. Search above to catch some!</p>
            ) : (
                <List>
                    {caughtBreeds.map((breed, index) => (
                        <ListItem key={index}>
                            <BreedItem breed={breed} index={index} />
                        </ListItem>
                    ))}
                </List>
            )}
        </CaughtBreedsContainer>
    );
}

export default CaughtBreeds;