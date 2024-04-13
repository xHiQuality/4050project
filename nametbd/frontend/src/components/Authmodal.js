import React, { useState } from 'react';
import '../styles/Authmodal.css'; // Import your CSS file for styling

function AuthModal() {
  const [isOpen, setIsOpen] = useState(true); // Directly set isOpen to true

  const closeModal = () => {
    setIsOpen(false);
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform authentication logic here
    console.log("Username:", username);
    console.log("Password:", password);
    // Reset input fields
    setUsername('');
    setPassword('');
    closeModal();
  };

  return (
    <>
      {isOpen && (
        <div className="auth-modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Log In / Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <input
                class = "login-page-input"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
              class="login-page-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button class="login-page-button" type="submit">Log In</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AuthModal;
