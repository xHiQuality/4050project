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
    <div className = "column1">
        <div className="votes">
          <button className='arrowButton'>
            <img id = "upArrow" src = "https://www.pngkit.com/png/full/21-217915_curved-white-arrow-png-white-up-arrow-icon.png"/>
            </button>
            <p>{post.votes}</p>
            <button className='arrowButton'>
            <img id = "downArrow" src = "https://www.pngkit.com/png/full/21-217915_curved-white-arrow-png-white-up-arrow-icon.png"/>
            </button>
        </div>
      </div>
      <div className = "column2">
        <ul className="menuBar">
            <li><button className = "accountButton"><img id = "accountImg" src={post.accountImage} alt="account"/></button></li>
            <li><h5 className="menuItem" id = "postInfo">. Posted by {post.author} {post.time}</h5></li>
            <li><button className = "followButton"> Follow</button></li>
            <li><button id = "other"><img id = "otherImage" src={"https://icon-library.com/images/three-dots-icon/three-dots-icon-26.jpg"} alt="other"/></button></li>
        </ul>
      <hr></hr>
      <div className="description">
        <h3 className="title">{post.title}</h3>
        {post.text ? <div className="textContainer"><p> {post.text} </p> </div> : null}
        {post.img ? <img className="visual" src={post.img} alt='post'/> : null}
        {post.vid ? <video className="visual" src={post.vid}/> : null}
      </div>
      <ul className="interactBar">
            <li><button className = "interactButton" id = "comment"><div className = "conatiner"><img className = "interactItem" src={"https://icon-library.com/images/comment-icon-transparent/comment-icon-transparent-12.jpg"} alt="comments"/><p class = "text">{post.commentsNum}</p></div></button></li>
            <li><button className = "interactButton" id = "share"><img className = "interactItem" src={"https://www.pngall.com/wp-content/uploads/2/Share-PNG-File.png"} alt="share"/> <p  class = "text">Share</p> </button></li>
            <li><button className = "interactButton" id = "save"><img className = "interactItem" src={"https://vectorified.com/images/save-picture-as-icon-15.png"} alt="save"/> <p  class = "text">Save</p> </button></li>
      </ul>
    </div>
    </div>
    </button>
    </div>
  )
}

export default post;