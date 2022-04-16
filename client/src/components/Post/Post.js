import React, { useState } from 'react';
import axios from 'axios';

import './Post.css';

export default function Post(props) {
  const { title, caption, id, filename, onClick } = props;
  const [loading, setLoading] = useState(true);

  return (
    <div className='feed-post-container'>
      <div className='flex post shadow' onClick={onClick}>
        <div className='post-title-container shadow'>
          <div className='post-title'>
            {title}
          </div>
        </div>
        <div className='post-image-container flex center'>
          <img 
            className='post-image' src={`http://localhost:8080/posts/image/${filename}`} alt='Inagram Post'
            onLoad={() => setLoading(false)}
          ></img>
        </div>
        <div className='post-caption-container center'>
          <div style={{ padding: 16}}>
            <p className='post-caption'>{caption}</p>
          </div>
        </div>
      </div>
      {!loading && <i 
        className="delete-image-post fa-solid fa-trash fa-width fa-xl"
        onClick={() => {
          axios.delete(`http://localhost:8080/posts/${id}`)
          .then(() => {
            console.log('Post has been deleted!');
            window.location.reload();
          })
          .catch(err => console.log(err));
        }}
      >
      </i>}
    </div>
  )
}
