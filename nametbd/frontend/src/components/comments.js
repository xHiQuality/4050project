import '../styles/comments.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import React, {useEffect, useState} from 'react';

export default function Comments(props) {

    const comment = props.item;
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/api/users', {
        params: {
          username: comment.commentAuthor
        }
      }).then((res) => {
        setUser(res.data);
      }).catch((err) => {
        console.log('Error from Post');
      });
      }, [comment.commentAuthor]);

      if (!user) {
        return <div>Loading...</div>; 
      }
      
      console.log(user);

    const handleUpClick = (event) => {
        // My TODO: will update backend. And vote number wiil update.
      }
  
      const handleDownClick = (event) => {
        // My TODO: will update backend. And vote number wiil update.
      }
  

    return (
    <div className='comment'>
    <ul className = "commentBar">
        <li id = "commentAccount" ><Link id = "commentAccountButton" to={`/profile`}><img id = "commentAccountImg" src={user[0].accountImage} alt="account"/></Link></li>
        <li id = "commentAuthor"><h5 id = "commentAuthorInfo">{comment.commentAuthor}</h5></li>
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


