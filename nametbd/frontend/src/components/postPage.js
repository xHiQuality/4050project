import '../styles/postPage.css';
import Comment from './comments.js';
import Post from './post.js';
import Navbar from './navbar.js';
import {Link, useParams, useLocation} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';

export default function PostPage(props) {

  const [post, setPost] = useState();
  const [comments, setComments] = useState();
  const [commentData, setCommentData] = useState('');

  const [token, setToken] = useState();
  const [username, setUsername] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setToken(localStorage.getItem('auth-token'));
      await setUsername(localStorage.getItem('auth-username'));
    };
    fetchData();
  }, []);

  // const location = useLocation();

  // useEffect(() => {
  //   // Perform actions on route change
  //   console.log('Current path:', location.pathname);
  // }, [location]);


  const handleChange = (e) => {
    setCommentData(e.target.value);
  };


  const {postid} = useParams();

  useEffect(() => {
    axios
        .get(`http://localhost:3001/api/posts/${postid}`)
        .then((res) => {
          setPost(res.data);
        })
        .catch((err) => {
      console.log('Error from PostPage');
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
    if (!post || !comments) {
      return <div>Loading...</div>; 
    }

    const handleComment = (event) => {
      event.preventDefault();

      console.log(commentData);

      axios.post('http://localhost:3001/api/comments', {
        commentAuthor: username,
        content: commentData,
        postID: postid,
        votes: 0
      }).catch((err) => {
        console.log('Error from PostPage');
      });
      

      event.target.reset();

      // Reload the page
      window.location.reload();

    }
    

    // const post = {
    //         id: 1,
    //         title: 'What Getting corrections from leaders during class',
    //         text: "I’ve been taking classes for a few months after just picking stuff up going to dances for a little over a year. I skated by on not knowing much from having a non-social dance background and being a decent follower but realized to get any further I’d have to really study, which is something I’m glad to be doing." +
      
    //         "However, I’m still pretty new to everything like the terminology and classes can feel kind of intense, some people around me have been doing it for years. I am not taking advanced classes, though and Im in the middle of the pack as far as I can tell. I pick up everything taught in each class quickly, but sometimes there is basic stuff going on around the moves of the day that I just haven’t been exposed to yet. And I’m ok with that…but sometimes my partners don’t seem to be." +
            
    //         "I am always happy to get critiques from the instructors. And if I blatantly mess up, and my partner says “oh I think you missed X thing” I appreciate that." +
            
    //         "But I’ve been having experiences at the school I’m going to where some leaders seem to take it upon themselves to coach me every time we are partnered. I’m getting unsolicited feedback to “just relax,” “do it more like this,” “try to figure out what I’m doing” (um, I am doing exactly that), and other corrections. I’m often still concentrating on something completely different. I’ve had people correct me after my very first time trying a new move before the teachers have even given us the breakdown for the followers part." +
            
    //         "The frustrating part is that when I dance with either of the teachers, I usually get a little coaching but mostly they say “yep you got it!” And when I dance with other skilled leaders, it often goes well, no one says anything to me." +
            
    //         "It’s really not working for me to be working so hard myself to learn the moves in a classroom setting, to be getting feedback from two teachers, and then additionally have random leaders decide they can also correct anything I’m not doing just right. It really starts to take the fun out of the class when it feels like I’m getting scrutinized with a fine tooth comb, especially because I’m already having to adapt to the completely different leading styles and physicality of each different leader. It’s especially frustrating because the leaders are making all kinds of mistakes all the time, and that’s ok, it’s a class. I wouldn’t dream of reporting back to each one after each run through what they did wrong. I feel like we are all there to figure it out." +
            
    //         "Is there an etiquette or protocol for this in the community? Is it generally acceptable for classmates to start coaching their partners?",
    //         img: "https://tse4.mm.bing.net/th?id=OIP.JKGWlAlIHdOM6DmypdCyzgHaEK&pid=Api&P=0&h=180",
    //         time: '1 min ago',
    //         author: "skycole768",
    //         accountImage:
    //           'https://lh3.googleusercontent.com/p/AF1QipNrqoDjdkfcLJAIHgqim9ATpX5f0v8zgMVRCRia=s1360-w1360-h1020',
    //         commentsNum: 20,
    //         votes: 300
    //     }

     // Check if user is null or undefined before accessing its properties

      post.home = "no";
    
  //   const comments = [
  //       {
  //           comment: "Hello, I hate you.",
  //           author: "skycole768",
  //           accountImage:
  //             'https://lh3.googleusercontent.com/p/AF1QipNrqoDjdkfcLJAIHgqim9ATpX5f0v8zgMVRCRia=s1360-w1360-h1020',
  //           time: '1 min ago',
  //           votes: 30
  //       },
  //       {
  //           comment: "Hello, I hate you.",
  //           author: "skycole768",
  //           accountImage:
  //             'https://lh3.googleusercontent.com/p/AF1QipNrqoDjdkfcLJAIHgqim9ATpX5f0v8zgMVRCRia=s1360-w1360-h1020',
  //           time: '1 min ago',
  //           votes: 30
  //       },
  //       {
  //           comment: "Hello, I hate you.",
  //           author: "skycole768",
  //           accountImage:
  //             'https://lh3.googleusercontent.com/p/AF1QipNrqoDjdkfcLJAIHgqim9ATpX5f0v8zgMVRCRia=s1360-w1360-h1020',
  //           time: '1 min ago',
  //           votes: 30
  //       },
  // ]

  return (
    <div className="home">
      <Navbar></Navbar>
      <div className="Page">
        <div className = "container">
        <Post className = "pagePost" item = {post}/>
        </div>
        <div className='commmentBoxContainer'>
        {/* <p id = "commentAs">Comment as </p>   */}
          <form style = {{display: token ? 'block': 'none'}}encType="text/plain" method="post" id = "commentForm" onSubmit={handleComment}>
          <textarea placeholder="What are your thoughts?" className="commmentBox" onChange={handleChange} required/>
          <div id = "commentButtonContainer">
          <input type="submit" className="commentButton" value="Comment"></input>
          </div>
         </form>
         <div style = {{display: comments.length === 0 ? "block": "none", marginTop: "8%", paddingLeft: '10%'}}>Be the first to comment!</div>
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