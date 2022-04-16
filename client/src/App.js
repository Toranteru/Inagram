import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Posts from './components/Posts/Posts';
import Feed from './components/Feed/Feed'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Posts />}></Route>
        <Route path='/posts' element={<Feed />}></Route>
      </Routes>
    </Router>
  )
}