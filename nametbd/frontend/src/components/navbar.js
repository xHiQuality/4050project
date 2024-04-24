import React, { useState } from 'react';
import '../styles/navbar.css';
import { Link} from 'react-router-dom';
import Authmodal from './Authmodal.js';

function Navbar(props) {
  // State to manage the visibility of the Authmodel
  const [showAuthModal, setShowAuthModal] = useState(false);

   // Function to toggle the visibility of the Authmodel
   const toggleAuthModal = () => {
    setShowAuthModal(!showAuthModal);
  };

return (
  <div className = "container">
    <nav className="navbar">
      <div className="navbar-logo">
      <Link id = "homeLink" to={`/`}>
        <button className = "logo-button">
        <img
          src="https://1000logos.net/wp-content/uploads/2017/05/Reddit-Logo.png"
          alt="not-reddit-logo"
          className="logo"
        />
        </button>
        </Link>
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
        <Link to ='/createPage' className="navButton" id="create-button">
          <img
            src="https://www.freepnglogos.com/uploads/plus-icon/plus-icon-plus-math-icon-download-icons-9.png"
            alt="create post"
            className="plus-icon"
            style={{ cursor: 'pointer' }}
          />
          <p>Create</p>
        </Link>
        
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
