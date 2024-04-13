import '../styles/comments.css';
import {Link} from 'react-router-dom';

export default function comments(props) {

    const comment = props.item;

    const handleUpClick = (event) => {
        // My TODO: will update backend. And vote number wiil update.
      }
  
      const handleDownClick = (event) => {
        // My TODO: will update backend. And vote number wiil update.
      }
  

    return (
    <div className='comment'>
    <ul className = "bar">
        <li id = "commentAccount" ><Link id = "commentAccountButton" to={`/profile`}><img id = "commentAccountImg" src={comment.accountImage} alt="account"/></Link></li>
        <li id = "commentAuthor"><h5 id = "commentAuthorInfo">{comment.author}</h5></li>
        <li id = "commentTime"><h5 id = "commentTimeInfo">{comment.time}</h5></li>
    </ul>
    <div className='commentContainer'>
        <p> {comment.comment}</p>
    </div>
    <ul className="commentVotes">
        <li id = "upComment">
          <button className='commentArrowButton' onClick={handleUpClick}>
            <img id = "commentUpArrow" alt = "vote up" src = "https://www.pngkit.com/png/full/21-217915_curved-white-arrow-png-white-up-arrow-icon.png"/>
            </button>
        </li>
        <li id ="commentVotesInfo">
            <p>{comment.votes}</p>
        </li>
        <li id = "downComment">
            <button className='commentArrowButton' onClick={handleDownClick}>
            <img id = "commentDownArrow" alt = "vote down" src = "https://www.pngkit.com/png/full/21-217915_curved-white-arrow-png-white-up-arrow-icon.png"/>
            </button>
        </li>
    </ul>
    </div>
    )};


