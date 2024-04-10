import './App.css';
import  React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './components/homepage';
import Profile from './components/profile';

function App() {

  return (
    <Router>
      <div className="grid">
        <Switch>
          <Route path='/' exact component ={Homepage}/>
          <Route path='/profile' component ={Profile}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;