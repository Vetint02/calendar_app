import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './css/register.css';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            return setError('Passwords do not match.');
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/login');
            } else {
                setError(data.message || 'Username is in use, try a different username');
            }
        } catch (err) {
            console.error('Registration link error:', err);
            setError('Unable to reach the server. Please try again later.');
        }
    };

    return (
        <div className="register-wrapper">
            <div className="register-card">
                <header className="register-header">
                    <h1>Create Account</h1>
                </header>

                {error && (
                    <div className="register-error-alert">
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="register-form">
                    <div className="register-form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Choose a username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="register-form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Create a strong password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="register-form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Re-enter your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="register-submit-btn">
                        Sign Up
                    </button>
                </form>


                <footer className="register-footer">
                    <p>Already have an account? <Link to="/login">Sign In</Link></p>
                </footer>

            </div>
        </div>
    );
}