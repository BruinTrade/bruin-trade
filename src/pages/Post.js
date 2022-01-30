import React from "react";
import { Routes, Route, useParams } from 'react-router-dom';

function Post() {
    return <Routes>
            <Route path="/" element={<PagePosts />}/>
            <Route path=":id" element={<PagePost />}/>
        </Routes>;
}

function PagePosts() {
    return <div>Posts Gallery</div>
}

function PagePost() {
    let { id } = useParams();
    return <div>Post: {id}</div>
}

export default Post;