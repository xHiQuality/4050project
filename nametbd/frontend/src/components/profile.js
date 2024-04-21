import React from 'react';
import Navbar from './navbar.js';
import '../styles/profile.css';
import '../styles/navbar.css';

function profile() {

    return (
        <div className="profilePage">
            <Navbar></Navbar>
            <div className="userProfile">
                <div className="profileHeader">
                    <div className="profilePicture">
                        <img src="https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" width = "150" height = "150px" alt="User/Profile Picture"/>
                    </div>
                    <h2>user-name</h2>
                </div>
                
                <button className ="editProfileButton">Edit Profile</button>
                <button className = "shareProfileButton">Share Profile</button>
                

                <div className="profileInfo">  
                    <div className="userDetails">
                        <p>Username: Mrudang Patel</p>
                        <p>Email: myp2k2nd@gmail.com</p>
                        <p>Number of posts: 0</p>
                        <p>Member since: 04-09-2024</p>
                        <p>Bio: Something blah blah blah...</p>
                    </div>

                    <div className="Posts">
                        <button className="createPostButton">Create Post</button>
                        <h3>My Posts:</h3>

                    </div>

                </div>

            </div>
        </div>
    );

}

export default profile;