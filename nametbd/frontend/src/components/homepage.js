import '../styles/homepage.css';
import Post from './post.js';
import Navbar from './navbar.js';
import axios from 'axios';
import React, {useEffect, useState} from 'react';

export default function Homepage({posts, setPosts}) {


  return (
    <div className="home">
      <Navbar setPosts={setPosts}/>
      <div className="Page">
        {posts.map((post, index) => {
          post.home = 'yes'
          return <Post className = "posts" key = {index} item={posts[index]} />;
        })}
      </div>
  </div>
  );
  }