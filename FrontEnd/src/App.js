import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "./components/navbar.js";

import PageHome from './pages/Home.js'
import PageAbout from './pages/About.js'
import PagePostIndex from './pages/Post.js'
import PageSignup from './pages/Signup.js'
import PageLogin from './pages/Login.js'
import PageCreatePost from "./pages/CreatePost.js"
import PageComponentGallery from './pages/ComponentGallery'
import Loading from './components/loading.js'
import Search from './pages/Search.js';

const App = () => (
  <div className='flex flex-row justify-center bg-bg_blue min-h-screen h-max'>
    <div className='w-1512px pb-100px'>
      <Router>
        <Loading />
        <NavBar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<PageHome/>} />
            <Route path="/post/*" element={<PagePostIndex/>} />
            <Route path="/about" element={<PageAbout/>} />
            <Route path="/signup" element={<PageSignup/>} />
            <Route path="/login" element={<PageLogin/>} />
            <Route path="/components" element={<PageComponentGallery/>} />
            <Route path="/create-post" element={<PageCreatePost/>} />
            <Route path="/search/*" element={<Search/>} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  </div>
);

export default App;