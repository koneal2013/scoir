import React, { useState } from 'react';
import axios from 'axios';
import { RegisterContainer, Title, Form, Label, Input, Button } from './styles';

function Register({ onRegister }) {
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
            });
    };

    return (
        <RegisterContainer>
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