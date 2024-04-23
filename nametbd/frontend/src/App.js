import './App.css';
import  React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/homepage';
import PostPage from './components/postPage';
import Profile from './components/profile';

function App() {

  return (
      <Router>
        <div>
          <Routes>
            <Route
              exact
              path="/"
              element={<Homepage />} // TODO change state
            />
            <Route
              exact
              path="/postPage/:postid"
              element={<PostPage />} // TODO change state
            />
            <Route 
              path="/profile" 
              element = {<Profile/>}/>
          </Routes>
        </div>
      </Router>
  );
};

export default App;