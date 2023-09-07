import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import MainApp from './MainApp';
import CaughtBreeds from "./CaughtBreeds";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    if (loggedIn) {
        return (<>
            <MainApp onLogout={() => setLoggedIn(false)} />
            <CaughtBreeds loggedIn={loggedIn} />
        </>);
    }

    if (showRegister) {
        return <Register onRegister={() => setShowRegister(false)} />;
    }

    return (
        <>
            <Login onLogin={() => setLoggedIn(true)} onShowRegister={() => setShowRegister(true)} />
        </>
    );
}

export default App;