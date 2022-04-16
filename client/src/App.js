import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Posts from './components/Posts/Posts';
import Feed from './components/Feed/Feed';
import Navbar from './components/Navbar/Navbar';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/posts' element={<Feed />}></Route>
        <Route path='/' element={<Posts />}></Route>
      </Routes>
    </Router>
  )
}