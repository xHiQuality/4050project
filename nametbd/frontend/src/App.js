import './App.css';
import  React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/homepage';
import PostPage from './components/postPage';
import Profile from './components/profile';
import axios from 'axios';
import CreatePage from './components/createPage';

export const UserDataContext = createContext(null);

function App() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/posts')
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log('Error from HomePage');
      });
  }, []);

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  useEffect(() => {
    const checkLogin = async () => {
      let token = localStorage.getItem("auth-token");
      if (token == null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      try {
        const tokenRes = await axios.get("http://localhost:3001/api/users/validate", null, {headers: {"x-auth-token": token}});
        if (tokenRes.data) {
          const userRes = await axios.get("http://localhost:3001/api/users/auth/", 
            {headers: {"x-auth-token": token}});
          if (token !== userData.token) {
            setUserData({
              token,
              user: userRes.data
            });
          }
        }
      } catch (err) {
        console.log("Axios is failing to validate token or update token in App.js ", err);
      }
    };
    checkLogin();
  }, [userData]);

  return (
    <UserDataContext.Provider value={{userData, setUserData}}>
      <Router>
        <div>
          <Routes>
            <Route
              exact
              path="/"
              element={<Homepage posts ={posts} setPosts = {setPosts}/>} // TODO change state
            />
            <Route
              exact
              path="/postPage/:postid"
              element={<PostPage setPosts = {setPosts}/>} // TODO change state
            />
            <Route 
              path="/profile/:id" 
              element = {<Profile setPosts = {setPosts}/>}/>
              <Route 
              path='/createPage/:id'
              element = {<CreatePage setPosts = {setPosts}/>}
              />
          </Routes>
        </div>
      </Router>
    </UserDataContext.Provider>
  );
};

export default App;