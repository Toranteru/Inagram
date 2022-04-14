import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Post.css';

export default function Post() {
  const image = useSelector(state => state.fileSlice.file);
  const dispatch = useDispatch();

  return (
    <div className='flex center wrapper'>
      {image ?
      <div className='flex center row gap'>
        <div id="image-view" className='flex center modal'>
          <img src={URL.createObjectURL(image)} alt="File uploaded"></img>
          <i 
            className="delete-image fa-solid fa-trash fa-width fa-2xl"
            onClick={() => dispatch({
              type: 'DELETE_FILE'
            })}
          >
          </i>
        </div>
        <div className='flex center modal side-panel'>
        </div>
      </div>
      :
      <div className='flex center modal'>
        <p>Upload photo and videos here</p>
        <input 
          id="image"
          type="file"
          style={{ display: 'none' }}
          onChange={(e) => dispatch({
            type: 'UPLOAD_FILE',
            payload: e.target.files[0]
          })}
        >
        </input>
        <label htmlFor="image" className="file-label">Select from computer</label>
      </div>}
    </div>
  )
}
