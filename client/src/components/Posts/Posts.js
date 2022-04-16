import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './Posts.css';

export default function Posts() {
  const { title, caption } = useSelector(state => state.postSlice);
  const { image } = useSelector(state => state.imageSlice);
  const dispatch = useDispatch();

  let file = useRef(null);
  useEffect(() => {
    if (!image) return;
    file.current = image;
    document.getElementById('image').src = URL.createObjectURL(file.current);
  }, [image])

  return (
    <div className='flex center wrapper'>
      {image ?
      <div className='flex center row gap'>
        <div id="image-view" className='flex center modal shadow'>
          <img id="image" alt="File uploaded"></img>
          <i 
            className="delete-image fa-solid fa-trash fa-width fa-2x"
            onClick={() => {
              dispatch({type: 'DELETE_POST'});
              dispatch({type: 'DELETE_IMAGE'});
            }}
          >
          </i>
        </div>
        <div className='flex center modal side-panel shadow'>
          <textarea 
            className='title' placeholder='<Title />'
            onChange={(e) => dispatch({
              type: 'UPDATE_TITLE',
              payload: e.target.value
            })}
          >
          </textarea>
          <textarea 
            className='caption' placeholder='<Caption />'
            onChange={(e) => dispatch({
              type: 'UPDATE_CAPTION',
              payload: e.target.value
            })}
          >
          </textarea>
          <button
            className='submit'
            onClick={() => {
              const data = new FormData();
              data.append('title', title);
              data.append('caption', caption);
              data.append('image', file.current);
              axios.post('http://localhost:8080/posts/submit', data)
              .then(res => {
                console.log(res.data);
                dispatch({ type: 'SUBMIT_POST' });
              })
              .catch(err => {
                console.log(err);
              });
            }}
          >
            Post
          </button>
        </div>
      </div>
      :
      <div className='flex center modal'>
        <p style={{ padding: '0px 20px' }}>Upload photo here</p>
        <input 
          id="image"
          type="file"
          style={{ display: 'none' }}
          onChange={(e) => dispatch({
            type: 'UPLOAD_IMAGE',
            payload: e.target.files[0]
          })}
        >
        </input>
        <label htmlFor="image" className="file-label">Select from computer</label>
      </div>}
    </div>
  )
}
