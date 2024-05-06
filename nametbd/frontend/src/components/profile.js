import React, {useEffect, useState} from 'react';
import Navbar from './navbar.js';
import '../styles/profile.css';
import '../styles/navbar.css';
import axios from 'axios';
import Post from  './post.js';
import {useNavigate, useParams} from 'react-router-dom';

function Profile({setPosts}) {

     const navigate = useNavigate();

    const {id} = useParams();

    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState(null);

    var accountImage = '';
    var username = '';
    
    const [userId, setId] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      await setId(localStorage.getItem('auth-id'));
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {

        try {
            const res = await axios.get(`http://localhost:3001/api/users/id/${id}`);
            setUser(res.data);
          } catch (err) {
            console.log('Error fetching posts:', err);
          }

        try {
          const res = await axios.get(`http://localhost:3001/api/posts/author/${user.username}`);

          for (var i=0; i<res.data.length; i++){
            res.data[i].home = 'yes';
          }

          setUserPosts(res.data);
        } catch (err) {
          console.log('Error fetching posts:', err);
        }
    };
  
    fetchData();
  });

  if(user) {
    accountImage = user.accountImage;
    username = user.username;
  }

  const handleCreate = (e) => {
    navigate(`/createPage/${id}`);
  }

  const handleDelete = async (idpost) => {

    try{
        await axios.delete(`http://localhost:3001/api/posts/${idpost}`);
    } catch(err) {
        console.log('Error from deleting post');
    }
  }

    return (
        <div className="profilePage">
            <Navbar setPosts = {setPosts}/>
            <div className="userProfile">
                <div className="profileHeader">
                    <div className="profilePicture">
                        <img src={accountImage} width = "150" height = "150px" alt="User/Profile" style = {{borderRadius: '50%'}}/>
                    </div>
                            <h2>{username}</h2>               
                </div>
                <div className="profileInfo">  
                    <div className="userDetails">
                        <p>Number of posts: {userPosts.length}</p>
                    </div>

                    <div className="Posts">
                    {userId == id ? <h3> My Posts:</h3> : <h3> Posts:</h3>}
                        <button style = {{display: userId == id ? "block": "none"}}className="createPostButton" onClick={handleCreate}>Create Post</button>
                        {userPosts.map((post, index) => (
                            <div>
                                <button onClick={() => handleDelete(userPosts[index].idpost)} style = {{width: '4%', float: 'right', border: 'none', backgroundColor: 'inherit', cursor: 'pointer', display: userId == id ? "block": "none"}}>
                                    <img src = "https://www.pinclipart.com/picdir/big/172-1720992_trash-vector-png-clipart-rubbish-bins-waste-paper.png" alt = 'trash' style = {{width: "100%"}}/>
                                    </button>
                                <Post className = "posts" key={index} item={userPosts[index]}/>
                            </div>
                        ))}
                        
                    </div>

                </div>

            </div>
        </div>
    );

}

export default Profile; 