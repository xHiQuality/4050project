import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import '../styles/Authmodal.css'; // Import your CSS file for styling

function AuthModal() {
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
      // Send a POST request to your backend endpoint to check if the user exists
      const response = await axios.post('/api/users/check', { username });
      setUserExists(response.data.exists);

      // If user exists and it's a sign-up attempt, don't proceed with sign-up
      if (isSignUp && response.data.exists) {
        // You can show an error message here or handle it as needed
        return;
      }

      // Perform authentication logic here
      console.log("Username:", username);
      console.log("Password:", password);

      // Reset input fields
      setUsername('');
      setPassword('');
      closeModal();
    } catch (error) {
      console.error('Error checking user existence:', error);
    }
  };

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
