import '../styles/homepage.css';
import Post from './post.js';
import Navbar from './navbar.js';
import Profile from './profile.js';

export default function homepage() {

  const posts = [
    {
      id: 1,
      title: 'What Should I Eat For Dinner?',
      text: "I'm torn between pasta or pho'. Italian or Asian. Thoughts? jhhjbkjb jjbjbkj dbjkbdef jkbdjkbe jkbedkjfb jkebfk jbrjkfb rjbfjrbf jkbjke jbejr bfjrbj brfbj brjfbr",
      img: "https://tse4.mm.bing.net/th?id=OIP.JKGWlAlIHdOM6DmypdCyzgHaEK&pid=Api&P=0&h=180",
      time: '1 min ago',
      author: "skycole768",
      accountImage:
        'https://lh3.googleusercontent.com/p/AF1QipNrqoDjdkfcLJAIHgqim9ATpX5f0v8zgMVRCRia=s1360-w1360-h1020',
      commentsNum: 120,
      votes: 300
    },
    {
      id: 1,
      title: 'What Should I Eat For Dinner?',
      text: "I'm torn between pasta or pho'. Italian or Asian. Thoughts? jhhjbkjb jjbjbkj dbjkbdef jkbdjkbe jkbedkjfb jkebfk jbrjkfb rjbfjrbf jkbjke jbejr bfjrbj brfbj brjfbr",
      img: "https://tse4.mm.bing.net/th?id=OIP.JKGWlAlIHdOM6DmypdCyzgHaEK&pid=Api&P=0&h=180",
      time: '1 min ago',
      author: "skycole768",
      accountImage:
        'https://lh3.googleusercontent.com/p/AF1QipNrqoDjdkfcLJAIHgqim9ATpX5f0v8zgMVRCRia=s1360-w1360-h1020',
      commentsNum: 120,
      votes: 300
    },
    {
      id: 1,
      title: 'What Getting corrections from leaders during class',
      text: "I’ve been taking classes for a few months after just picking stuff up going to dances for a little over a year. I skated by on not knowing much from having a non-social dance background and being a decent follower but realized to get any further I’d have to really study, which is something I’m glad to be doing." +

      "However, I’m still pretty new to everything like the terminology and classes can feel kind of intense, some people around me have been doing it for years. I am not taking advanced classes, though and Im in the middle of the pack as far as I can tell. I pick up everything taught in each class quickly, but sometimes there is basic stuff going on around the moves of the day that I just haven’t been exposed to yet. And I’m ok with that…but sometimes my partners don’t seem to be." +
      
      "I am always happy to get critiques from the instructors. And if I blatantly mess up, and my partner says “oh I think you missed X thing” I appreciate that." +
      
      "But I’ve been having experiences at the school I’m going to where some leaders seem to take it upon themselves to coach me every time we are partnered. I’m getting unsolicited feedback to “just relax,” “do it more like this,” “try to figure out what I’m doing” (um, I am doing exactly that), and other corrections. I’m often still concentrating on something completely different. I’ve had people correct me after my very first time trying a new move before the teachers have even given us the breakdown for the followers part." +
      
      "The frustrating part is that when I dance with either of the teachers, I usually get a little coaching but mostly they say “yep you got it!” And when I dance with other skilled leaders, it often goes well, no one says anything to me." +
      
      "It’s really not working for me to be working so hard myself to learn the moves in a classroom setting, to be getting feedback from two teachers, and then additionally have random leaders decide they can also correct anything I’m not doing just right. It really starts to take the fun out of the class when it feels like I’m getting scrutinized with a fine tooth comb, especially because I’m already having to adapt to the completely different leading styles and physicality of each different leader. It’s especially frustrating because the leaders are making all kinds of mistakes all the time, and that’s ok, it’s a class. I wouldn’t dream of reporting back to each one after each run through what they did wrong. I feel like we are all there to figure it out." +
      
      "Is there an etiquette or protocol for this in the community? Is it generally acceptable for classmates to start coaching their partners?",
      img: "https://tse4.mm.bing.net/th?id=OIP.JKGWlAlIHdOM6DmypdCyzgHaEK&pid=Api&P=0&h=180",
      time: '1 min ago',
      author: "skycole768",
      accountImage:
        'https://lh3.googleusercontent.com/p/AF1QipNrqoDjdkfcLJAIHgqim9ATpX5f0v8zgMVRCRia=s1360-w1360-h1020',
      commentsNum: 20,
      votes: 300
    }
  ]

  return (
    <div className="home">
      <Navbar></Navbar>
      <div className="Page">
        {posts.map((posts, index) => {
          return <Post className = "post" item={posts} />;
        })}
      </div>
  </div>
  );
  }