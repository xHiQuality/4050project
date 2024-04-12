import React, { useState } from 'react';
import '../styles/navbar.css';
import Authmodal from './Authmodal.js';

function Navbar(props) {
  // State to manage the visibility of the Authmodel
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Function to toggle the visibility of the Authmodel
  const toggleAuthModal = () => {
    setShowAuthModal(!showAuthModal);
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className="navbar-logo">
          <button className="logo-button">
            <img
              src="https://1000logos.net/wp-content/uploads/2017/05/Reddit-Logo.png"
              alt="not-reddit-logo"
              className="logo"
            />
          </button>
        </div>
        <div className="bar">
          <input
            type="text"
            placeholder="Search Not Reddit"
            id="navbar-search-field"
          />
          <img
            src="https://icon-library.com/images/search-icon-png-transparent/search-icon-png-transparent-18.jpg"
            alt="search icon"
            className="search-icon"
            style={{ cursor: 'pointer' }}
          />
        </div>
        <button className="navButton" id="message-button">
          <img
            src="https://creazilla-store.fra1.digitaloceanspaces.com/icons/3216841/chat-circle-dots-icon-md.png"
            alt="message box"
            className="message-icon"
            style={{ cursor: 'pointer' }}
          />
        </button>
        <button className="navButton" id="create-button">
          <img
            src="https://www.freepnglogos.com/uploads/plus-icon/plus-icon-plus-math-icon-download-icons-9.png"
            alt="create post"
            className="plus-icon"
            style={{ cursor: 'pointer' }}
          />
        </button>
        
        {/* Button to toggle the Authmodel */}
        <button className="navButton" id="login-button" onClick={toggleAuthModal}>
          Login
        </button>
      </nav>
      <hr />
      
      {/* Render Authmodel conditionally */}
      {showAuthModal && <Authmodal />}
    </div>
  );
}

export default Navbar;
