import React, {useEffect, useState} from 'react';
import Navbar from './navbar.js';
import '../styles/profile.css';
import '../styles/navbar.css';
import axios from 'axios';
import Post from  './post.js';
import {useNavigate, useParams} from 'react-router-dom';

function Profile() {
    // not working :(
     const navigate = useNavigate();
    // const [user, setUser] = useState(null);

    // const {userId} = useParams();

    // var username = '';

    // useEffect(() => {
    //     axios.get(`http://localhost:3001/api/users/id/${userId}`).then((res) => {
    //     setUser(res.data);
    //   }).catch((err) => {
    //     console.log('Error from Post');
    //   });
    //   }, [userId]);

    // if(user) {
    //     username = user.username;
    // }


    const [username, setUsername] = useState(null);
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);

    var accountImage = '';
    const {userId} = useParams();
    console.log(userId);

  useEffect(() => {
    const fetchData = async () => {
      await setUsername(localStorage.getItem('auth-username'));

    if (username) {
        try {
          const res = await axios.get(`http://localhost:3001/api/posts/author/${username}`);
          setPosts(res.data);
        } catch (err) {
          console.log('Error fetching posts:', err);
        }

        try {
            const res = await axios.get(`http://localhost:3001/api/users/username/${username}`);
            setUser(res.data);
          } catch (err) {
            console.log('Error fetching posts:', err);
          }
      }
    };
  
    fetchData();
  }, [username]);

  if(user) {
    accountImage = user.accountImage;
  }

  const handleCreate = (e) => {
    navigate(`/createPage/${username}`);
  }
    /*
    const handleCreatePost = async() => {
        try {
            const response = await axios.post()
        } catch (error) {
            console.error(error);
        }
    };*/

    // const handleEditClick = () => {
    //     setEditingUserProfile(true);
    //     setNewUsername(userData.username);
    //     setNewBio(userData.bio);
    // };

    // const handleCancelClick = () => {
    //     setEditingUserProfile(false);
    // };

    // const handleSaveClick = async () => {
    //     try {
    //         await axios.put(`http://localhost:3001/api/users/id/${userData.iduser}`, {
    //             username: newUsername,
    //             bio: newBio
    //         });
    //         setUserData({...userData, username: newUsername, bio: newBio});
    //         setEditingUserProfile(false);
    //     } catch (error) {
    //         console.error (error);
    //     }
    // };

    // const handleUsernameChange = (event) => {
    //     setNewUsername(event.target.value);
    // };

    // const handleUserBioChange = (event) => {
    //     setNewUsername(event.target.value);
    // };

    return (
        <div className="profilePage">
            <Navbar></Navbar>
            <div className="userProfile">
                <div className="profileHeader">
                    <div className="profilePicture">
                        <img src={accountImage} width = "150" height = "150px" alt="User/Profile Picture" style = {{borderRadius: '50%'}}/>
                    </div>
                    
                    {/* {editingUserProfile ? (
                        <div>
                            <div className="userName">
                                <h2>{userData.username}</h2>
                                <h2>mrudang</h2>
                                <p>Email: {userData.email}</p>
                                <input type="text" value={newUsername} onChange={handleUsernameChange} placeholder="Enter new username"/>
                            </div>
                            <div className="userBio">
                                <textarea type="text" value={newBio} onChange={handleUserBioChange} placeholder="Enter new bio..."/>
                            </div>
                        </div> ) : ( */}
                        <div>
                            <h2>{username}</h2>
                            {/* <h2>{userData.username}</h2> */}
                            {/* <p>Email: {userData.email}</p>
                            <p>{userData.bio}</p> */}
                        </div>
                    {/* )} */}


                    {/* {editingUserProfile ? (
                        <div className="editButtons">
                            <button className="saveButton" onClick={handleSaveClick}>Save</button>
                            <button className="cancelButton" onClick={handleCancelClick}>Cancel</button>
                        </div> ) : (
                        <div className="profileButtons">
                            <button className="editProfileButton" onClick={handleEditClick}>Edit Profile</button>
                            <button className="shareProfileButton">Share Profile</button>
                        </div>
                    )} */}
                    
                </div>
                

                
                <div className="profileInfo">  
                    <div className="userDetails">
                        {/* <p>Email: ///</p> */}
                        <p>Number of posts: {posts.length}</p>
                        {/* <p>Member since: April 22, 2024</p>
                        <p>Bio: Hello CSCI 4050/6050!</p> */}
                    </div>

                    <div className="Posts">
                        <h3>My Posts:</h3>
                        <button className="createPostButton" onClick={handleCreate}>Create Post</button>
                        {posts.map((post, index) => (
                            <Post className = "posts" key={index} item={posts[index]}/>
                        ))}
                        
                    </div>

                </div>

            </div>
        </div>
    );

}

export default Profile; 