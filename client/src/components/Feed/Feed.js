import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Feed.css';

function feedView(posts) {
  if (!posts) return;
  let post = posts.map((post, key) => {
    return (
      <div key={key} className='flex post shadow'>
        <div className='post-title-container shadow'>
          <div className='post-title'>{post.title}</div>
        </div>
        <div className='post-image-container flex center'>
         <img className='post-image' src={`http://localhost:8080/posts/image/${post.filename}`} alt='Inagram Post'></img>
        </div>
        <div className='post-caption-container center'>
          <div style={{ padding: 16}}>
            <p className='post-caption'>{post.caption}</p>
          </div>
        </div>
      </div>
    )
  });
  return (
    <>
      {post}
    </>
  )
}

export default function Feed() {
  const [feed, setFeed] = useState([]);

  function getFeed() {
    axios.get('http://localhost:8080/posts/')
    .then(res => setFeed(res.data))
    .catch(err => console.log(err));
  }

  useEffect(() => {
    getFeed();
  }, [])

  return (
    <div id='feed' className='wrapper post-container flex center'>
      {feed ? feedView(Array.from(feed)) : <></>}
    </div>
  )
}
