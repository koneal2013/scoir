import React, { useState } from 'react';
import axios from 'axios';
import { LoginContainer, Title, Form, Label, Input, Button } from './styles';

function Login({ onLogin }) {
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
            });
    };

    return (
        <LoginContainer>
            <Title>Login</Title>
            <Form onSubmit={handleSubmit}>
                <Label>
                    Username
                    <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </Label>
                <Label>
                    Password
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Label>
                <Button type="submit">Login</Button>
            </Form>
        </LoginContainer>
    );
}

export default Login;