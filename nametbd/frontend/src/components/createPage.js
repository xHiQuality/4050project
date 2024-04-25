import React, { useState } from 'react';
import '../styles/createPage.css';
import {useNavigate} from 'react-router-dom';
import NavBar from './navbar';
import axios from 'axios';


function CreatePage(props) {

    const navigate = useNavigate();

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
      };

    const [post, setPost] = useState({
        author: 'admin',
        content: '',
        tag: '',
        header: '',
        votes: 0,
        image: '',
      });

 const handleSubmit = (event) =>{
    event.preventDefault();

    axios
      .post(`http://localhost:3001/api/posts/`, post)
      .then((res) => {
        setPost({
            author: 'admin',
            content: '',
            tag: '',
            header: '',
            votes: 0,
            image: '',
        });

        // Push to /
        navigate(`/profile/:userid`);
      })
      .catch((err) => {
        console.log('Error in CreatePost!');
      });
  };
  
return (
    <div className = "postPageContainer">
        <NavBar> </NavBar>
        <h3 id ="createPageHeader"> Create a post</h3>
        <hr style = {{borderColor: 'white'}}/>
        <div className = "postForm">
            <form onSubmit={handleSubmit}>
            <div tabIndex="0" className="formWrapper" style = {{display: 'flex'}}>
                <div id = 'atTagContainer'> 
                    <p id = 'atTag'>@</p>
                </div>
                <input
                    id = 'tag'
                    value={post.tag}
                    onChange={handleChange}
                    type="text"
                    name="tag"
                    placeholder='Tag (optional)' 
                    onFocus={() => console.log('Focused!')} // Add onFocus event handler
                    style={{outline: 'none'}}
                />
                </div>
                <hr id = "middleHr"/>
            <div className="formWrapper">
              <input
                id = 'header'
                value={post.header}
                onChange={handleChange}
                type="text"
                name="header"
                placeholder="Title"
                required
              />
            </div>
            <div className="formWrapper" id = 'contentWrapper'>
              <textarea
                id = 'content'
                value={post.content}
                onChange={handleChange}
                type="text"
                name="content"
                placeholder="Text"
                required
              />
              </div>
              <div className="formWrapper">
              <input
                id = 'url'
                value={post.image}
                onChange={handleChange}
                type="text"
                name="image"
                placeholder="Image url (optional)"
              />
            </div>
            <hr id='bottomHr'/>
            <div className="postSubmit">
              <button className="postButton" type="submit">
                  Post
              </button>
            </div>
          </form>
        </div> 
    </div>
  
  );
}

export default CreatePage;