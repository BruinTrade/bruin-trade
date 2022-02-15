import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "./components/navbar.js";
import Home from './pages/Home.js'
import About from './pages/About.js'
import Post from './pages/Post.js'
import createPost from './components/icons_js/createPost.jsx';

const App = () => (
  <div className='bg-bg_blue'>
    <Router>
      <NavBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/post/*" element={<Post/>} />
          <Route path="/about" element={<About/>} />
        </Routes>
      </Suspense>
    </Router>
  </div>
  
);

export default App;