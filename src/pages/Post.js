import React from "react";
import { Routes, Route, useParams } from 'react-router-dom';

function Post() {
    return <Routes>
            <Route path="/" element={<MyPosts />}/>
            <Route path=":id" element={<PostPage />}/>
        </Routes>;
}

function MyPosts() {
    return <div>My Post</div>
}

function PostPage() {
    let { id } = useParams();
    return <div>Post: {id}</div>
}

export default Post;