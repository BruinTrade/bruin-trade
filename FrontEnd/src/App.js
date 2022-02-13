import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "./components/navbar.js";
import Home from './pages/Home.js'
import About from './pages/About.js'
import Post from './pages/Post.js'
import PageSignup from './pages/Signup.js'
import PageLogin from './pages/Login.js'

const App = () => (
  <div className='flex flex-row justify-center bg-bg_blue h-screen'>
    <div className='w-1512px'>
      <Router>
        <NavBar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/post/*" element={<Post/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/signup" element={<PageSignup/>} />
            <Route path="/login" element={<PageLogin/>} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  </div>
);

export default App;