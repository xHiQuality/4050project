import '../styles/profile.css';
import React from 'react';

function profile() {

    return (
        <div className="userProfile">
            <div className="profileHeader">
                <h2>USER PROFILE</h2>
                <button className="editProfileButton">Edit Profile</button>
            </div>

            <div className="profileInfo">
                <div className="profilePicture">
                    <img src="https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" alt="User/Profile Picture"/>
                </div>

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

            <button className = "shareProfileButton">Share Profile</button>
        </div>
    );

}

export default profile;