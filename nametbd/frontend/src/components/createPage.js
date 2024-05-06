import React, { useState, useEffect} from 'react';
import '../styles/createPage.css';
import {useNavigate, useParams} from 'react-router-dom';
import NavBar from './navbar';
import axios from 'axios';

function CreatePage({setPosts}) {

  const [userPost, setUserPost] = useState({
    author: '',
    content: '',
    tag: '',
    header: '',
    votes: 0,
    image: '',
  });

  const [user, setUser] = useState("");

    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
      axios
        .get(`http://localhost:3001/api/users/id/${id}`)
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
        })
        .catch((err) => {
          console.log('Error from createPage');
        });

        setUserPost({
          author: user.username,
          content: '',
          tag: '',
          header: '',
          votes: 0,
          image: '',
        });

    }, [id, user.username]);

    const handleChange = (e) => {
        setUserPost({ ...userPost, [e.target.name]: e.target.value });
      };

 const handleSubmit = (event) =>{
  event.preventDefault();

  axios
        .get(`http://localhost:3001/api/users/id/${id}`)
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
        })
        .catch((err) => {
          console.log('Error from createPage');
        });

  userPost.author = user.username;

  axios
    .post(`http://localhost:3001/api/posts/`, userPost)
    .then((res) => {
      setUserPost({
          author: user.username,
          content: '',
          tag: '',
          header: '',
          votes: 0,
          image: '',
      });

        // Push to /
        navigate(`/`);
      })
      .catch((err) => {
        console.log('Error in CreatePost!');
      });
  };

  if (!user) {
    return <div>Loading...</div>; 
  }
  
return (
    <div className = "postPageContainer">
        <NavBar setPosts = {setPosts}/>
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
                    value={userPost.tag}
                    onChange={handleChange}
                    type="text"
                    name="tag"
                    placeholder='Tag (optional)' 
                    style={{outline: 'none'}}
                />
                </div>
                <hr id = "middleHr"/>
            <div className="formWrapper">
              <input
                id = 'header'
                value={userPost.header}
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
                value={userPost.content}
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
                value={userPost.image}
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