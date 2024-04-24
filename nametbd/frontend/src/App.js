import './App.css';
import  React, { createContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/homepage';
import PostPage from './components/postPage';
import Profile from './components/profile';
import axios from 'axios';

export const UserDataContext = createContext(null);

function App() {

  const [userData, setuserData] = useState({
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
        const tokenRes = await axios.post("http://localhost:8080/api/users/validate", null, {headers: {"x-auth-token": token}});
        if (tokenRes.data) {
          const userRes = await axios.get("http://localhost:8080/api/users/auth/", 
            {headers: {"x-auth-token": token}});
          if (token !== userData.token) {
            setuserData({
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
    <UserDataContext.Provider value={{userData, setuserData}}>
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
              path="/postPage"
              element={<PostPage />} // TODO change state
            />
            <Route 
              path="/profile" 
              element = {<Profile/>}/>
          </Routes>
        </div>
      </Router>
    </UserDataContext.Provider>
  );
};

export default App;