import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "./components/navbar.js";
import Home from './pages/Home.js';
import About from './pages/About.js';
import Post from './pages/Post.js';
import ComponentGallery from './pages/ComponentGallery';

const App = () => (
  <div className='bg-bg_blue'>
    <Router>
      <NavBar location="UCLA" numCartItem={3} />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/post/*" element={<Post/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/components" element={<ComponentGallery/>} />
        </Routes>
      </Suspense>
    </Router>
  </div>
  
);

export default App;