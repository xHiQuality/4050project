import '../styles/post.css';
import dawg from '../images/DAWG.png';
import axios from 'axios';
import React, {useEffect, useState} from 'react';

function Post(props) {
  var commentNum = 0;
  const post = props.item;
  var userId = '';
  var userAccountImage = '';

  const [user, setUser] = useState(null);
  const [comment, setComment] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/users/username/' + post.author, {
  }).then((res) => {
    setUser(res.data);
  }).catch((err) => {
    console.log('Error from Post');
  });
  }, [post.author]);
  
  useEffect(() => {
    axios.get(`http://localhost:3001/api/comments/`, {
      params: {
        postID: post.idpost
      }
  }).then((res) => {
    setComment(res.data);
  }).catch((err) => {
    console.log('Error from Post');
  });
  }, [post.idpost]);

  // Check if user is null or undefined before accessing its properties
  if (user) {
    userId = user.iduser;
    userAccountImage = user.accountImage;
  } 

  if (comment){
    commentNum = comment.length;
  }



  if(post.content && post.home === "yes" && post.content.length > 937) {
    post.content = post.content.substring(0, 937);

    if (post.content.substr(post.content.length - 1, 1) !== ""){
      var lastIndex = post.content.lastIndexOf(" ");
      post.content = post.content.substring(0, lastIndex);
    }
    }
 

    const handlePostClick = () => {

      if (post.home === "yes"){
        window.location.href = `/postPage/${post.idpost}`;
      }
    };

    const handleAccountClick = (event) => {
      //stop from going to post page
      event.stopPropagation();
      window.location.href = `/profile/${userId}`;
    };

    const handleShareClick = (event) => {
      //stop parent's click event handler
      event.stopPropagation();

      //TODO:get method to get specif post url from backend
      var existingPostUrl = `http://localhost:3001/postPage/${post.idpost}`;
      navigator.clipboard.writeText(existingPostUrl);

      const modal = document.getElementById('modalContainer');
      modal.style.display = 'block';

    // Close the modal after 3 seconds
    setTimeout(() => {
      modal.style.display = 'none';
    }, 3000);

    }

    const handleUpClick = (event) => {
      //stop parent's click event handler
      event.stopPropagation();
      try {
        const response = axios.put('http://localhost:3001/api/posts/upvote/' + post.idpost);
        console.log(response);
        window.location.reload();
      } catch (err) {
        console.log("Error in post upvote axios");
      } // try-catch
      // My TODO: will update backend. And vote number wiil update.
    }

    const handleDownClick = (event) => {
      //stop parent's click event handler
      event.stopPropagation();
      try {
        const response = axios.put('http://localhost:3001/api/posts/downvote/' + post.idpost);
        console.log(response);
        window.location.reload();
      } catch (err) {
        console.log("Error in post downvote axios");
      } // try-catch

      // My TODO: will update backend. And vote number wiil update.
    }


     const handleCommentClick = async (event) => { 
       //stop parent's click event handler
       event.stopPropagation();
       event.preventDefault();

       //doesn't work on diff page, not sure why

       window.location.replace(`postPage/${post.idpost}#commentAnchor`);

    }
    
  return (
    
    <div  className = {post.home == "yes" ? "postContainerHome" : "postContainer"} onClick={handlePostClick}>
    <div className="post">
    <div className = "column1">
        <div className="votes">
          <button className='arrowButton' onClick={handleUpClick}>
            <img id = "upArrow" alt = "vote up" src = "https://vectorified.com/images/white-arrow-icon-png-15.png"/>
            </button>
            <p id = "votesNum">{post.votes}</p>
            <button className='arrowButton' onClick={handleDownClick}>
            <img id = "downArrow" alt = "vote down" src = "https://vectorified.com/images/white-arrow-icon-png-15.png"/>
            </button>
        </div>
      </div>
      <div className = "column2">
        <ul className="menuBar">
            <li id = "account" ><button id = "accountButton" onClick={handleAccountClick}><img id = "accountImg" src={userAccountImage} alt="account"/></button></li>
            <li id = "info"><h5 id = "postInfo"> <span style={{fontWeight: "bold", color: "rgb(71, 71, 71)"}}>@{post.tag}</span> . Posted by {post.author}</h5></li>
        </ul>
      <hr></hr>
      <div className="description">
        <h3 className="title">{post.header}</h3>
        {post.content ? post.home == "yes" ? <div className="gradientTextContainer"><p> {post.content} </p> </div> : <div className="textContainer"><p> {post.content} </p> </div>  : null}
        {post.image ? <img className="visual" src={post.image} alt='post'/> : null}
        {post.vid ? <video className="visual" src={post.vid}/> : null}
      </div>
      <ul className="interactBar">
        <li id = "comment">
          <button onClick={handleCommentClick} className = "interactButton" id = "postCommentButton" disabled={post.home == "no" ? true : false}>
            <img id = "commentImage" className = "interactItem" src={"https://icon-library.com/images/comment-icon-transparent/comment-icon-transparent-12.jpg"} alt="comments"/>
            <p className = "text">{commentNum}</p>
          </button>
        </li>
        <li id = "share">
          <button className = "interactButton" onClick={handleShareClick}>
            <img className = "interactItem" src={"https://www.pngall.com/wp-content/uploads/2/Share-PNG-File.png"} alt="share"/> 
            <p  className = "text">Share</p> 
            </button>
          </li>
      </ul>

      <div id="modal">
          <div id="modalContainer">
          <p id="alertMessage"><img id = "modalImage" src = {dawg} alt="reddit copy link logo"/>Link Copied!</p>
          </div>
          </div>
       </div>
        </div>
        </div>

  )
}

export default Post;