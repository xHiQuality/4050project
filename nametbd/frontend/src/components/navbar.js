import React, { useState, useEffect, useContext} from 'react';
import '../styles/navbar.css';
import logo from '../images/DAWGIT.png';
import { Link, useNavigate} from 'react-router-dom';
import Authmodal from './Authmodal.js';
import axios from 'axios';
import {UserDataContext} from '../App.js'

function Navbar(props) {
  const {setUserData} = useContext(UserDataContext);
  const navigate = useNavigate();



  // State to manage the visibility of the Authmodel
  const [showAuthModal, setShowAuthModal] = useState(false);

   // Function to toggle the visibility of the Authmodel
   const toggleAuthModal = () => {

    setShowAuthModal(!showAuthModal);
  };

  const [token, setToken] = useState();
  const [username, setUsername] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      setToken(localStorage.getItem('auth-token'));
      await setUsername(localStorage.getItem('auth-username'));
    };
  
    fetchData();
  }, []);

  

  const handleProfile = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.get(`http://localhost:3001/api/users/username/${username}`);
      const user = res.data;
      navigate(`/profile/${user.iduser}`);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    await setUserData({
      token: undefined,
      user: undefined,
    });

    localStorage.setItem('auth-token', '');
    localStorage.setItem('auth-Id', '');

    navigate('/');
    window.location.reload();
  

  }
return (
  <div className = "container">
    <nav className="navbar">
      <div className="navbar-logo">
      <Link id = "homeLink" to={`/`}>
        <button className = "logo-button">
        <img
          src={logo}
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
      <button  className='profileItem' onClick={handleProfile}>
        <img id = 'profile' alt = "profile" style = {{display: token ? 'block': 'none'}} src = "https://imgs.search.brave.com/MWlI8P3aJROiUDO9A-LqFyca9kSRIxOtCg_Vf1xd9BA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc"/>
      </button>
        <Link to ={`/createPage/${username}`} className="navButton" id="create-button" style = {{display: token ? 'flex': 'none'}}>
          <img
            src="https://www.freepnglogos.com/uploads/plus-icon/plus-icon-plus-math-icon-download-icons-9.png"
            alt="create post"
            className="plus-icon"
            style={{ cursor: 'pointer' }}
          />
          <p id = "create">Create</p>
        </Link>
        
        {/* Button to toggle the Authmodel */}
        {token ? (
        <button className="navButton" id="login-button" onClick={handleLogout}>
          Logout
        </button>
        ) : (
        <button className="navButton" id="login-button" onClick={toggleAuthModal}>
          Login
        </button>
        )
        }
      </nav>
      <hr />
      
      {/* Render Authmodel conditionally */}
      {showAuthModal && <Authmodal />}
    </div>
  );
}

export default Navbar;
