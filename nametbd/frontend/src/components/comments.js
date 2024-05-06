import '../styles/comments.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import React, {useEffect, useState} from 'react';

export default function Comments(props) {

    const comment = props.item;
    const [user, setUser] = useState(null);

   var userAccountImage = '';

   const [id, setId] = useState(null);
   const [iduser, setUserId] = useState('');

   useEffect(() => {
    setId(localStorage.getItem('auth-id'));
}, []);
 

    useEffect(() => {
        axios.get('http://localhost:3001/api/users/username/' + comment.commentAuthor, {
      }).then((res) => {
        setUser(res.data);
        setUserId(res.data.iduser);
    
      }).catch((err) => {
        console.log('Error from Post');
      });
      }, [comment.commentAuthor]);

      if (user) {
        userAccountImage = user.accountImage;
      }

 
    const handleUpClick = async (event) => {
        try {
            const response = axios.put('http://localhost:3001/api/comments/upvote/' + comment.commentID);
            window.location.reload();
            console.log(response);
          } catch (err) {
            console.log("Error in comment upvote axios");
          } // try-catch
      }
  
      const handleDownClick = async (event) => {
        try {
            const response = axios.put('http://localhost:3001/api/comments/downvote/' + comment.commentID);
            window.location.reload();
            console.log(response);
          } catch (err) {
            console.log("Error in comment downvote axios");
          } // try-catch
      }

      const handleDelete = async (idcomment) => {
        try {
          await axios.delete(`http://localhost:3001/api/comments/${idcomment}`);
          window.location.reload();
        } catch (err) {
          console.log("Error in deleting comment");
        }
      }


    return (
    <div className='comment'>
    <ul className = "commentBar">
        <li id = "commentAccount" ><Link id = "commentAccountButton" to={`/profile/${iduser}`}><img id = "commentAccountImg" src={userAccountImage} alt="account"/></Link></li>
        <li id = "commentAuthor"><h5 id = "commentAuthorInfo">{comment.commentAuthor}</h5></li>
        <li style = {{display: id == iduser ? 'block': 'none'}}><button onClick={() => handleDelete(comment.commentID)} style = {{width: '7%', border: 'none', backgroundColor: 'inherit', cursor: 'pointer', float: 'right'}}>
              <img src = "https://www.pinclipart.com/picdir/big/172-1720992_trash-vector-png-clipart-rubbish-bins-waste-paper.png" alt = 'trash' style = {{width: "100%"}}/>
          </button></li>
    </ul>
    <div className='commentContainer'>
        <p> {comment.content}</p>
    </div>
    <ul className="commentVotes">
        <li id = "upComment">
          <button className='commentArrowButton' onClick={handleUpClick}>
            <img id = "commentUpArrow" alt = "vote up" src = "https://vectorified.com/images/white-arrow-icon-png-15.png"/>
            </button>
        </li>
        <li id ="commentVotesInfo">
            <p>{comment.votes}</p>
        </li>
        <li id = "downComment">
            <button className='commentArrowButton' onClick={handleDownClick}>
            <img id = "commentDownArrow" alt = "vote down" src = "https://vectorified.com/images/white-arrow-icon-png-15.png"/>
            </button>
        </li>
    </ul>
    </div>
    )};


