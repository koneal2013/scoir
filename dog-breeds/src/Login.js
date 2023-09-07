import React, { useState } from 'react';
import axios from 'axios';
import { LoginContainer, LoginForm, Label, Input, LoginButton, RegisterButton } from './styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

function Login({ onLogin, onShowRegister }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post('http://localhost:8080/login', { username, password })
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                onLogin();
            })
            .catch((error) => {
                console.error('Error logging in:', error);
                showErrorToast('Login failed. Please check your credentials.');
            });
    };

    return (
        <LoginContainer>
            <ToastContainer />
            <LoginForm onSubmit={handleSubmit}>
                <Label htmlFor="username">Username</Label>
                <Input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Label htmlFor="password">Password</Label>
                <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <LoginButton type="submit">Log In</LoginButton>
            </LoginForm>
            <RegisterButton onClick={onShowRegister}>Register</RegisterButton>
        </LoginContainer>
    );
}

export default Login;