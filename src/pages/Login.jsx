import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthenticationContext from '../contexts/AuthenticationContext';
import './css/login.css'

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const { isAuthenticated, setAuthentication } = useContext(AuthenticationContext);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            });

            const text = await response.text();
            const data = text ? JSON.parse(text) : {};

            if (response.ok) {
                setAuthentication(true);
                navigate('/');
            } else {
                alert(data.message || "Authentication failed");
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    }

    return (
        <div className="login-wrapper">
            <div className="login-card">

                <header className="login-header">
                    <h1>Sign In</h1>
                </header>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="login-form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoComplete="username"
                        />
                    </div>

                    <div className="login-form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <button type="submit" className="login-submit-btn">
                        Sign In
                    </button>
                </form>
                <div className="new_user">
                    <Link to="/register">Create account</Link>
                </div>

            </div>
        </div>
    );
}