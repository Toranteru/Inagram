import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Feed.css';

import Post from '../Post/Post'
import Modal from '../Modal/Modal';

export default function Feed() {
  const [feed, setFeed] = useState([]);
  const [modal, setModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
    getFeed();
  }, [])

  function getFeed() {
    axios.get('http://localhost:8080/posts/')
    .then(res => setFeed(res.data))
    .catch(err => console.log(err));
  }

  function handleModal() {
    setModal(!modal);
  }

  function handlePost(post) {
    setCurrentPost(post);
  }

  function feedView(posts) {
    if (!posts) return;

    let post = posts.map(post => {
      return (
        <Post 
          key={post.id}
          id={post.id}
          title={post.title}
          caption={post.caption}
          filename={post.filename}
          onClick={() => {
            handleModal();
            handlePost(post);
          }}
        />
      )
    });
    return (
      <>
        {post}
      </>
    )
  }

  return (
    <div id='feed' className='wrapper post-container flex center'>
      {feed ? feedView(Array.from(feed)) : <></>}
      <Modal visibility={modal} post={currentPost} onClick={handleModal} />
    </div>
  )
}
