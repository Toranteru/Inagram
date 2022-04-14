import React from 'react';
import './Post.css';

function handleFile(e) {
  console.log(e.target.files);
}

export default function Post() {
  return (
    <div className='flex center'>
      <div className='flex center modal'>
        <p>Upload photo and videos here</p>
        <input 
          id="image"
          type="file"
          style={{ display: 'none' }}
          onChange={handleFile}
        >
        </input>
        <label htmlFor="file-upload" className="file-label">Select from computer</label>
      </div>
    </div>
  )
}
