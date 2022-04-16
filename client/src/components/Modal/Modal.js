import React from 'react';
import './Modal.css';

export default function Modal(props) {
  const { post, onClick } = props;

  function generateCaption(caption) {
    let captionLines = caption.split(/\r?\n/).map(captionLine => {
      return (
        <p className='caption-line'>{captionLine}</p>
      )
    });
    return captionLines;
  }

  return (
    <>
    {post && <div id='modal' 
      className={'flex center wrapper ' + (props.visibility ? '' : 'hidden')}
      onClick={onClick}
    >
      <div className='modal-bg'></div>
      <div className='modal-content flex'>
        <div className='modal-image-container flex center'>
          <img className='modal-image' src={`http://localhost:8080/posts/image/${post.filename}`} alt='Inagram Post'></img>
        </div>
        <div className='modal-sidebar flex'>
          <div className='modal-title-container bottom'>{post.title}</div>
          <div className='captions bottom'>{generateCaption(post.caption)}</div>
        </div>
      </div>
    </div>}
    </>
  )
}
