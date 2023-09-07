import React, { useState } from 'react';
import axios from 'axios';
import { RegisterContainer, Title, Form, Label, Input, Button } from './styles';
import {toast, ToastContainer} from "react-toastify";

function Register({ onRegister }) {
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
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post('http://localhost:8080/register', { username, password })
            .then((response) => {
                onRegister();
            })
            .catch((error) => {
                console.error('Error registering user:', error);
                showErrorToast('Registration failed. User already exists.');
            });
    };

    return (
        <RegisterContainer>
            <ToastContainer />
            <Title>Register</Title>
            <Form onSubmit={handleSubmit}>
                <Label>
                    Username
                    <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </Label>
                <Label>
                    Password
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Label>
                <Button type="submit">Register</Button>
            </Form>
        </RegisterContainer>
    );
}

export default Register;