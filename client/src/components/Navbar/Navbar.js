import React from 'react'
import { Link } from 'react-router-dom'

import './Navbar.css';

export default function Navbar() {
  return (
    <div className='navbar flex center shadow'>
      <Link className='link' to='/posts'><i className="fa-solid fa-house fa-width"></i></Link>
      <Link className='link' to='/'><i className="fa-solid fa-plus fa-width"></i></Link>
    </div>
  )
}
