import React, { useState } from 'react';
import axios from 'axios';
import { RandomBreedButtonContainer } from './styles';
import {toast, ToastContainer} from "react-toastify";

const showErrorToast = (message) => {
    toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

const showSuccessToast = (message) => {
    toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

function RandomBreedButton() {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const handleClick = () => {
        axios
            .get('/api/breeds/image/random')
            .then((response) => {
                const imageUrl = response.data.message;
                const breed = imageUrl.split('/')[4];
                axios
                    .post('http://localhost:8080/dogcards', {'image': imageUrl, 'breed': breed})
                    .then((response) => {
                        showSuccessToast('added dog card')
                    })
                    .catch((error) => {
                        console.error('Error creating random dog card:', error);
                        showErrorToast('Error creating random dog card:', error);
                    });
            })
            .catch((error) => {
                console.error('Error fetching random breed:', error);
                showErrorToast('Error fetching random breed:', error);
            });
    };

    return (
        <RandomBreedButtonContainer>
            <ToastContainer />
            <button onClick={handleClick}>Catch A Random Breed</button>
        </RandomBreedButtonContainer>
    );
}

export default RandomBreedButton;