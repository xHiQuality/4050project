import React, {useEffect, useState} from 'react';
import Navbar from './navbar.js';
import '../styles/profile.css';
import '../styles/navbar.css';
import axios from 'axios';
import Post from  './post.js';
import homepage from './homepage.js';

function Profile() {
    const [userData, setUserData] = useState({});
    const [userPosts, setUserPosts] = useState([]);
    //const [newCreatePost, setNewCreatePost] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [editingUsername, setEditingUsername] = useState(false);

    useEffect (() => {
        getUserData();
        getUserPosts();
    }, []);

    const getUserData = async(username) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/users?author=${username}`);
            const data = response.json();
            setUserData(data);
        } catch (error) {
            console.error(error);
        }
    };

    const getUserPosts = async(author) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/posts?author=${author}`);
            const data = response.json();
            setUserPosts(data);
        } catch (error) {
            console.error(error);
        }
    };

    /*
    const handleCreatePost = async() => {
        try {
            const response = await axios.post()
        } catch (error) {
            console.error(error);
        }
    };*/

    const handleEditClick = () => {
        setEditingUsername(true);
        setNewUsername(userData.username)
    };

    const handleCancelClick = () => {
        setEditingUsername(false);
    };

    const handleSaveClick = async () => {
        try {
            await axios.put(`http://localhost:8080/api/updateUsername`, {newUsername});
            setUserData({...userData, username: newUsername});
            setEditingUsername(false);
        } catch (error) {
            console.error (error);
        }
    };

    const handleUsernameChange = (event) => {
        setNewUsername(event.target.value);
    };

    return (
        <div className="profilePage">
            <Navbar></Navbar>
            <div className="userProfile">
                <div className="profileHeader">
                    <div className="profilePicture">
                        <img src={userData.accountImage} width = "150" height = "150px" alt="User/Profile Picture"/>
                    </div>
                    
                    {editingUsername ? (
                        <input
                            type="text"
                            value={newUsername}
                            onChange={handleUsernameChange}
                        />) : (
                        <h2>{userData.username}</h2>
                    )}

                    
                </div>
                
                {editingUsername ? (
                    <div className="editButtons">
                        <button className="saveButton" onClick={handleSaveClick}>Save</button>
                        <button className="cancelButton" onClick={handleCancelClick}>Cancel</button>
                    </div> ) : (
                    <div className="profileButtons">
                        <button className="editProfileButton" onClick={handleEditClick}>Edit Profile</button>
                        <button className="shareProfileButton">Share Profile</button>
                    </div>
                )}

                
                <div className="profileInfo">  
                    <div className="userDetails">
                        <p>Email: ///</p>
                        <p>Number of posts: ///</p>
                        <p>Member since: April 22, 2024</p>
                        <p>Bio: Hello CSCI 4050/6050!</p>
                    </div>

                    <div className="Posts">
                        <button className="createPostButton">Create Post</button>
                        <h3>My Posts:</h3>
                        {userPosts.map((posts, index) => (
                            <Post className = "posts" key={index} item={posts}/>
                        ))}
                        
                    </div>

                </div>

            </div>
        </div>
    );

}

export default Profile; 