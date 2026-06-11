import React, { useState } from 'react';
import './css/contact.css';

export default function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log("Sending message:", { email, message });
  };

  return (
    <div className="contact-wrapper">
      <div className="contact-container">
        
        <header className="contact-header">
          <h1>Contact</h1>
        </header>
        <hr className="contact-divider" />
        <div className="contact-content">
          <section className="contact-info-panel">
            <div className="info-block">
              <h3>Email</h3>
              <p className="blank-space-text">roy.park.0704@gmail.com</p>
            </div>
            
            <div className="info-block">
              <h3>GitHub</h3>
              <p className="blank-space-text">https://github.com/Vetint02</p>
            </div>

            <div className="info-block">
              <h3>Location</h3>
              <p className="blank-space-text">Seattle, Washington</p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}