import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home.js'));
const About = lazy(() => import('./pages/About.js'));
const Post = lazy(() => import('./pages/Post.js'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="post/*" element={<Post />} />
        <Route path="about" element={<About />} />
      </Routes>
    </Suspense>
  </Router>
);

export default App;