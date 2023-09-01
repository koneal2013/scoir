import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useDebounce from './useDebounce';
import { useDispatch } from 'react-redux';
import { SearchBarContainer, Label, Input, SearchResults, SearchResult } from './styles';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [searchResults, setSearchResults] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (debouncedSearchTerm) {
            axios
                .get(`https://dog.ceo/api/breeds/list/all`)
                .then((response) => {
                    const breeds = Object.keys(response.data.message);
                    const filteredBreeds = breeds.filter((breed) =>
                        breed.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
                    );
                    setSearchResults(filteredBreeds);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    setSearchResults([]);
                });
        } else {
            setSearchResults([]);
        }
    }, [debouncedSearchTerm]);

    const handleSearchResultClick = (breed) => {
        dispatch({ type: 'ADD_BREED', payload: breed });
        setSearchTerm('');
        setSearchResults([]);
    };

    return (
        <SearchBarContainer>
            <Label htmlFor="search-input">Find a breed to catch</Label>
            <Input
                type="text"
                id="search-input"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchResults.length > 0 && (
                <SearchResults>
                    {searchResults.map((breed, index) => (
                        <SearchResult key={index} onClick={() => handleSearchResultClick(breed)}>
                            {breed}
                        </SearchResult>
                    ))}
                </SearchResults>
            )}
        </SearchBarContainer>
    );
}

export default SearchBar;