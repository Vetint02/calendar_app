import React from 'react';
import './css/about.css';

export default function About() {
    return (
        <div className="about-wrapper">
            <div className="about-container">

                <header className="about-header">
                    <h1>Calendar</h1>
                    <p className="about-lead">
                        A personal space to pin your activities
                    </p>
                </header>

                <hr className="about-divider" />

                <footer className="about-footer">
                    <p>&copy; 2026 Roy Park. All rights reserved.</p>
                </footer>

            </div>
        </div>
    );
}