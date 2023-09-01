// ClearAllButton.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { ClearAllButtonContainer } from './styles';

function ClearAllButton() {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch({ type: 'CLEAR_ALL' });
    };

    return (
        <ClearAllButtonContainer onClick={handleClick}>
            Clear All
        </ClearAllButtonContainer>
    );
}

export default ClearAllButton;