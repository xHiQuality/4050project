import React from 'react';
import '../styles/navbar.css';

function navbar(props) {
    

return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img
          src="https://1000logos.net/wp-content/uploads/2017/05/Reddit-Logo.png"
          alt="not-reddit-logo"
          className="logo"
        />
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
          sytle={{ cursor: 'pointer' }}
        />
      </div>

       
        <button id="login-button">Login</button>
        
        </nav>
)};

export default navbar;