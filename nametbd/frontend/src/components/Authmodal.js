import React, { useState, useContext, useEffect} from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import '../styles/Authmodal.css'; // Import your CSS file for styling
import { UserDataContext, setUserData } from '../App';
import {useNavigate} from 'react-router-dom';

function AuthModal() {
  const [error, setError] = useState('');
  const {setUserData} = useContext(UserDataContext);
  const [isOpen, setIsOpen] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false); // State to track sign-up mode

  const navigate = useNavigate();

  const closeModal = () => {
    setIsOpen(false);
    navigate('/');
    window.location.reload();
  };

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Send a GET request to check if the user exists
      const userExistsResponse = await axios.get("http://localhost:3001/api/users/username/" + username);
      console.log(userExistsResponse.data == '');
      if (userExistsResponse.data == '') {
        setError("User doesn't exist. Please sign up.");
      }
      if (userExistsResponse && userExistsResponse.data != '') {
        const loginUser = {username, password};
        console.log(loginUser);
        const loginResponse = await axios.post("http://localhost:3001/api/users/login", loginUser);
        if (loginResponse && loginResponse.data) {
          setUserData({
            user: loginResponse.data.user,
            token: loginResponse.data.token
            
          });
          console.log(loginResponse.data);
          localStorage.setItem("auth-token", loginResponse.data.token);

          localStorage.setItem("auth-id", loginResponse.data.user.id);
          
          console.log("Logged in User:", username);

          setUsername('');
          setPassword('');
          closeModal();
    
        }
      }
     } catch(err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
          setError('An unknown error occurred'); 
      }
       }
     };  
 
     const handleSignUp = async (event) => {
      event.preventDefault();

      try {
        //create new user and then log them in
       const newUser = { username, password, accountImage: "" };
       const signUpResponse = await axios.post("http://localhost:3001/api/users/signup", newUser);
       if (signUpResponse && signUpResponse.data) {
         // Assuming successful sign-up returns login details
         setUserData({
           user: signUpResponse.data.user,
           token: signUpResponse.data.token
         });
         console.log(signUpResponse);
         localStorage.setItem("auth-token", signUpResponse.data.token);
         localStorage.setItem("auth-id", signUpResponse.data.user.id);
         console.log("Signed up and logged in User:", username);
       }
       setUsername('');
       setPassword('');
       closeModal();
       } catch (err) {
        console.log(err);
        if (err.response.data.message === 'Validation error') {
          // Handle the validation error
          setError("User already exists. Please login.");
        }
        else if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
            setError('An unknown error occurred'); 
        }
       }
     }

  return (
    <>
      {isOpen && (
        <div className="auth-modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{isSignUp ? 'Sign Up' : 'Log In'}</h2>
            <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
              <input
                className="login-page-input"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                className="login-page-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button className="login-page-button" type="submit">
                {isSignUp ? 'Sign Up' : 'Log In'}
              </button>
            </form>
            {isSignUp ? (
              <p>Already have an account? <a href="#" onClick={handleSignInClick}>Log In</a></p>
            ) : (
              <p>New to DAWGIT? <a href="#" onClick={handleSignUpClick}>Sign Up</a></p>
            )}

            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      )}
    </>
  );
}

export default AuthModal;
