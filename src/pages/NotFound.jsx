import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/notFound.css';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-wrapper">
      <div className="notfound-container">
        <h1 className="notfound-code">404</h1>
        
        <header className="notfound-header">
          <h2>Page Not Found</h2>
          <p className="notfound-lead">
            The page you are looking for doesn't exist, has been removed, or was moved to another address.
          </p>
        </header>

      </div>
    </div>
  );
}