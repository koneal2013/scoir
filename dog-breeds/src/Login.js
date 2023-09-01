import React, { useState } from 'react';
import { LoginContainer, LoginForm, Label, Input, LoginButton } from './styles';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username && password) {
            onLogin();
        }
    };

    return (
        <LoginContainer>
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
        </LoginContainer>
    );
}

export default Login;