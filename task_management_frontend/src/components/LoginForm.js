import React, { useState } from "react";
import {login} from "../services/api";

function LoginForm( {setToken} ) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const tokenData = await login(username, password);
            setToken(tokenData.access_token);
            console.log('Login successful');
        } catch (error) {
            console.log("Failed to login", error);
        }
    };

    return (
        <form onSubmit={ handleLogin }>
            <input type={"text"}
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
                   placeholder={"Username"}
                   required={true}
            />
            <input type={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={"Password"}
                    required={true}
            />
            <button onClick={ handleLogin }>Login</button>
        </form>
    );
}

export default LoginForm;