import '../styles/postPage.css';
import Comment from './comments.js';
import Post from './post.js';
import Navbar from './navbar.js';
import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';

export default function PostPage({setPosts}) {

  const [userPost, setUserPost] = useState();
  const [comments, setComments] = useState();
  const [commentData, setCommentData] = useState('');
  const [token, setToken] = useState();
  const [id, setId] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      setToken(localStorage.getItem('auth-token'));
      await setId(localStorage.getItem('auth-id'));
    };
  
    fetchData();
  }, []);


  const handleChange = (e) => {
    setCommentData(e.target.value);
  };


  const {postid} = useParams();

  useEffect(() => {
    axios
        .get(`http://localhost:3001/api/posts/${postid}`)
        .then((res) => {
          setUserPost(res.data);
        })
        .catch((err) => {
      console.log('Error from PostPage');
        });

        axios.get(`http://localhost:3001/api/comments/`, {
          params: {
            postID: postid
          }
      }).then((res) => {
        setComments(res.data);
      }).catch((err) => {
        console.log('Error from Post');
      });
      }, [postid]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/comments/`, {
        params: {
          postID: postid
        }
    }).then((res) => {
      setComments(res.data);
    }).catch((err) => {
      console.log('Error from Post');
    });
    }, [postid]);

  
    // Check if post is null or undefined before accessing its properties
    if (!userPost || !comments) {
      return <div>Loading...</div>; 
    }

    const handleComment = async(event) => {
        event.preventDefault();
  
    try {
      const userResponse = await axios.get(`http://localhost:3001/api/users/id/${id}`);
      const currentUser = userResponse.data;
      
      const commentResponse = await axios.post('http://localhost:3001/api/comments', {
        commentAuthor: currentUser.username,
        content: commentData,
        postID: postid,
        votes: 0
      });
  
      // Update the comments state with the new comment
      setComments([...comments, commentResponse.data]);
    } catch (error) {
      console.log('Error from PostPage:', error);
    }
  
    event.target.reset();
  
  }

  userPost.home = "no";

  return (
    <div className="home">
      <Navbar setPosts = {setPosts}/>
      <div className="Page">
        <div className = "container">
        <Post className = "pagePost" item = {userPost}/>
        </div>
        <div className='commmentBoxContainer'>  
          <form style = {{display: token ? "block": "none"}} encType="text/plain" method="post" id = "commentForm" onSubmit={handleComment}>
          <textarea placeholder="What are your thoughts?" className="commmentBox" onChange={handleChange} required/>
          <div id = "commentButtonContainer">
          <input type="submit" className="commentButton" value="Comment"></input>
          </div>
         </form>
         <div style = {{display: comments.length == 0 ? "block": "none", marginTop: "8%", paddingLeft: '10%'}}>Be the first to comment!</div>
        </div>
        <div id="commentAnchor" className = "commentsContainer">
        {comments.map((comment, index) => {
          return <Comment key = {index} item={comments[index]} />;
        })}
        </div>
      </div>
  </div>
  );
  }