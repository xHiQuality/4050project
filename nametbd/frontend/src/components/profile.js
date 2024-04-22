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

    useEffect (() => {
        getUserData();
        getUserPosts();
    }, []);

    const getUserData = async(username) => {
        try {
            const response = await axios.get(`/api/posts?author=${username}`);
            const data = response.json();
            setUserData(data);
        } catch (error) {
            console.error(error);
        }
    };

    const getUserPosts = async(username) => {
        try {
            const response = await axios.get(`/api/posts?author=${username}`);
            const data = response.json();
            setUserPosts(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="profilePage">
            <Navbar></Navbar>
            <div className="userProfile">
                <div className="profileHeader">
                    <div className="profilePicture">
                        <img src="https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" width = "150" height = "150px" alt="User/Profile Picture"/>
                    </div>
                    <h2>{userData.username}</h2>
                </div>
                
                <button className ="editProfileButton">Edit Profile</button>
                <button className = "shareProfileButton">Share Profile</button>
                

                <div className="profileInfo">  
                    <div className="userDetails">
                        <p>Username: {userData.username}</p>
                        <p>Email: ///</p>
                        <p>Number of posts: ///</p>
                        <p>Member since: ///</p>
                        <p>Bio: ///</p>
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