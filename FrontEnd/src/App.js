import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "./components/navbar.js";

import Home from './pages/Home.js'
import About from './pages/About.js'
import Post from './pages/Post.js'
import PageSignup from './pages/Signup.js'
import PageLogin from './pages/Login.js'
import ComponentGallery from './pages/ComponentGallery';
import Loading from './components/loading.js';

const App = () => (
  <div className='flex flex-row justify-center bg-bg_blue min-h-screen h-max'>
    <div className='w-1512px pb-100px'>
      <Router>
        <Loading />
        <NavBar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/post/*" element={<Post/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/signup" element={<PageSignup/>} />
            <Route path="/login" element={<PageLogin/>} />
            <Route path="/components" element={<ComponentGallery/>} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  </div>
);

export default App;