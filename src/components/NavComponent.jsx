import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthenticationContext from '../contexts/AuthenticationContext.jsx';
import './css/Nav.css'

export default function Nav() {
    const { isAuthenticated, setAuthentication } = useContext(AuthenticationContext);
    const navigate = useNavigate();

    async function handleLogout() {
        const response = await fetch('http://localhost:5000/api/auth/logout', {
            method: 'POST',
            credentials: 'include'
        });
        if (response.ok) {
            setAuthentication(false);
            navigate('/login');
        }
    }

    return (
        <nav className="nav_links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            {isAuthenticated && <button className="logout_button" onClick={handleLogout}>Logout</button>}
        </nav>
    );
}