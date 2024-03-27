// ./components/post.jsx

import React from 'react';
import '../styles/post.css';

function post(props) {
  const post = props.item;

  if(post.text && post.text.length > 937) {
    post.text = post.text.substring(0, 937);

    if (post.text.substr(post.text.length - 1, 1) !== ""){
      var lastIndex = post.text.lastIndexOf(" ");
      post.text = post.text.substring(0, lastIndex);
    }
    }
    
  return (
    <div className="boarder">
    <button className = "postbutton">
    <div className="post">
        <ul className="menuBar">
            <li><img id = "accountImg" src={post.accountImage} alt="account"/></li>
            <li><h6 className="menuItem"><b>{post.tag}</b></h6></li>
            <li><h5 className="menuItem" id = "postInfo">. Posted by {post.author} {post.time}</h5></li>
            <li><button className = "followButton"> Follow</button></li>
      </ul>
      <hr></hr>
      <div className="description">
        <h3 className="title">{post.title}</h3>
        {post.text ? <div className="textContainer"><p> {post.text} </p> </div> : null}
        {post.img ? <img className="visual" src={post.img} alt='post'/> : null}
        {post.vid ? <video className="visual" src={post.vid}/> : null}
      </div>
      <ul className="interactBar">
            <li><button className = "interactButton"><img className = "interactItem" id = "comments" src={"https://icon-library.com/images/comment-icon-transparent/comment-icon-transparent-12.jpg"} alt="comments"/></button></li>
            <li><p id = "CommentText">Comments {post.commentsNum}</p></li>
            <li><button className = "interactButton"><img className = "interactItem" id = "share" src={"https://www.pngall.com/wp-content/uploads/2/Share-PNG-File.png"} alt="share"/></button></li>
            <li><p id = "shareText">Share</p></li>
            <li><button className = "interactButton"><img className = "interactItem" id = "save" src={"https://vectorified.com/images/save-picture-as-icon-15.png"} alt="save"/></button></li>
            <li><p id = "saveText">Save</p></li>
            <li><button className = "interactButton"><img className = "interactItem" id = "other" src={"https://icon-library.com/images/three-dots-icon/three-dots-icon-26.jpg"} alt="other"/></button></li>
      </ul>
    </div>
    </button>
    </div>
  )
}

export default post;