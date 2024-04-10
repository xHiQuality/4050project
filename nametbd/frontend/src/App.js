import './App.css';
import  React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/homepage';
import Profile from './components/profile';

function App() {

  return (
    <Router>
      <div className="grid">
        <Routes>
          <Route path="/" element = {<Homepage/>} />
          <Route path="/profile" element = {<Profile/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;