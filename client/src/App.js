import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Post from './components/Post/Post';
import Feed from './components/Feed/Feed'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Post />}></Route>
        <Route path='/posts' element={<Feed />}></Route>
      </Routes>
    </Router>
  )
}