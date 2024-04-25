import React, { useState, useContext } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import '../styles/Authmodal.css'; // Import your CSS file for styling
import { UserDataContext, setUserData } from '../App';

function AuthModal() {
  const {setUserData} = useContext(UserDataContext);
  const [isOpen, setIsOpen] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false); // State to track sign-up mode
  const [userExists, setUserExists] = useState(false); // State to track user existence

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send a GET request to check if the user exists
      const userExistsResponse = await axios.get("http://localhost:3001/api/users/username/" + username);
      if (userExistsResponse && userExistsResponse.data) {
        // If user exists, proceed to login
        const loginResponse = await axios.get("http://localhost:3001/api/users/login", { username, password });
        if (loginResponse && loginResponse.data) {
          setUserData({
            user: loginResponse.data.user,
            token: loginResponse.data.token
          });
          localStorage.setItem("auth-token", loginResponse.data.token);
          console.log("Logged in User:", username);
        }
      } else {
        // If user does not exist, create new user and then log them in
        const newUser = { username, password, accountImage: "" };
        const signUpResponse = await axios.post("http://localhost:3001/api/users/signup", newUser);
        if (signUpResponse && signUpResponse.data) {
          // Assuming successful sign-up returns login details
          setUserData({
            user: signUpResponse.data.user,
            token: signUpResponse.data.token
          });
          localStorage.setItem("auth-token", signUpResponse.data.token);
          console.log("Signed up and logged in User:", username);
        }
      }
    } catch (error) {
      console.error('Axios failed in Authmodal.js', error);
    } finally {
      // Reset input fields and close modal
      setUsername('');
      setPassword('');
      closeModal();
    }
  };


  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     // Send a POST request to your backend endpoint to check if the user exists
  //     axios.get("http://localhost:8080/api/users/username?username=" + username)
  //     .then(data => {
  //       if (data) {
  //         setIsSignUp(false);
  //       } else {
  //         setIsSignUp(true);
  //       }
  //     });
  //     // If user exists and it's a sign-up attempt, don't proceed with sign-up
  //     if (isSignUp) {
  //       const newUser = {username, password, accountImage: ""};
  //       await axios.post("http://localhost:8080/api/users/signup", newUser);
  //     }
  //     const loginRes = await axios.get("http://localhost:8080/api/users/login", {username, password});
  //     setUserData({
  //       user: loginRes.data.user,
  //       token: loginRes.data.token
  //     });
  //     localStorage.setItem("auth-token", loginRes.data.token);

  //     // Perform authentication logic here
  //     console.log("Username:", username);
  //     console.log("Password:", password);
  //   } catch (error) {
  //     console.log('Axios failed in Authmodal.js', error);
  //   } finally {
  //     // Reset input fields
  //     setUsername('');
  //     setPassword('');
  //     closeModal();
  //   }
  // };

  return (
    <>
      {isOpen && (
        <div className="auth-modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{isSignUp ? 'Sign Up' : 'Log In'}</h2>
            <form onSubmit={handleSubmit}>
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
              <p>New to Reddit? <a href="#" onClick={handleSignUpClick}>Sign Up</a></p>
            )}
            {userExists && <p>User already exists!</p>}
          </div>
        </div>
      )}
    </>
  );
}

export default AuthModal;
