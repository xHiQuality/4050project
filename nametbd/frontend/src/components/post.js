// ./components/post.jsx

import React from 'react';
import '../styles/post.css';
//import {Link} from 'react-router-dom';

function post(props) {
  const post = props.item;

  if(post.text && post.home === "yes" && post.text.length > 937) {
    post.text = post.text.substring(0, 937);

    if (post.text.substr(post.text.length - 1, 1) !== ""){
      var lastIndex = post.text.lastIndexOf(" ");
      post.text = post.text.substring(0, lastIndex);
    }
    }

    const handlePostClick = () => {

      if (post.home === "yes"){
        window.location.href = '/postPage';
      }
    };

    const handleAccountClick = (event) => {
      //stop from going to post page
      event.stopPropagation();
      window.location.href = '/profile';
    };

    const handleFollowClick = (event) => {
      //stop from going to post page
      event.stopPropagation();
      // My TODO: will update backend. And button wiil change to unfollow.
    };

    const handleSaveClick = (event) => {
      //stop parent's click event handler
      event.stopPropagation();
      // My TODO: will update backend. And button will be higlighted.
    };

    const handleShareClick = (event) => {
      //stop parent's click event handler
      event.stopPropagation();

      //TODO:get method to get specif post url from backend, but for now
      var existingPostUrl = "http://localhost:3000/";
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
      // My TODO: will update backend. And vote number wiil update.
    }

    const handleDownClick = (event) => {
      //stop parent's click event handler
      event.stopPropagation();
      // My TODO: will update backend. And vote number wiil update.
    }


     const handleCommentClick = async (event) => { 
       //stop parent's click event handler
       event.stopPropagation();
       event.preventDefault();

       //doesn't work on diff page, not sure why

       window.location.replace('/postPage#commentAnchor');

    }
    
  return (
    
    <div  className = {post.home === "yes" ? "postContainerHome" : "postContainer"} onClick={handlePostClick}>
    <div className="post">
    <div className = "column1">
        <div className="votes">
          <button className='arrowButton' onClick={handleUpClick}>
            <img id = "upArrow" alt = "vote up" src = "https://www.pngkit.com/png/full/21-217915_curved-white-arrow-png-white-up-arrow-icon.png"/>
            </button>
            <p>{post.votes}</p>
            <button className='arrowButton' onClick={handleDownClick}>
            <img id = "downArrow" alt = "vote down" src = "https://www.pngkit.com/png/full/21-217915_curved-white-arrow-png-white-up-arrow-icon.png"/>
            </button>
        </div>
      </div>
      <div className = "column2">
        <ul className="menuBar">
            <li id = "account" ><button id = "accountButton" onClick={handleAccountClick}><img id = "accountImg" src={post.accountImage} alt="account"/></button></li>
            <li id = "info"><h5 id = "postInfo">. Posted by {post.author} {post.time}</h5></li>
            <li id = "follow"><button className = "followButton" onClick={handleFollowClick}> Follow</button></li>
            <li id  = "other"><button id = "otherButton"><img id = "otherImage" src={"https://icon-library.com/images/three-dots-icon/three-dots-icon-26.jpg"} alt="other"/></button></li>
        </ul>
      <hr></hr>
      <div className="description">
        <h3 className="title">{post.title}</h3>
        {post.text ? post.home === "yes" ? <div className="gradientTextContainer"><p> {post.text} </p> </div> : <div className="textContainer"><p> {post.text} </p> </div>  : null}
        {post.img ? <img className="visual" src={post.img} alt='post'/> : null}
        {post.vid ? <video className="visual" src={post.vid}/> : null}
      </div>
      <ul className="interactBar">
            <li id = "comment"><button onClick={handleCommentClick} className = "interactButton"><img id = "commentImage" className = "interactItem" src={"https://icon-library.com/images/comment-icon-transparent/comment-icon-transparent-12.jpg"} alt="comments"/><p className = "text">{post.commentsNum}</p></button></li>
            <li id = "share"><button className = "interactButton" onClick={handleShareClick}><img className = "interactItem" src={"https://www.pngall.com/wp-content/uploads/2/Share-PNG-File.png"} alt="share"/> <p  className = "text">Share</p> </button></li>
            <li id = "save"><button className = "interactButton" onClick={handleSaveClick}><img id = "saveImage" className = "interactItem" src={"https://clipground.com/images/bookmark-icon-clipart-1.png"} alt="save"/> <p  className = "text">Save</p> </button></li>
      </ul>

      <div id="modal">
          <div id="modalContainer">
          <p id="alertMessage"><img id = "modalImage" src = "https://www.businessofindiegames.com/wp-content/uploads/2019/06/Reddit-Logo-Blue-.png" alt="reddit copy link logo"/>Link Copied!</p>
          </div>
          </div>
       </div>
        </div>
        </div>

  )
}

export default post;