import React from "react";
import { Routes, Route, useParams } from 'react-router-dom';
import ItemDetails from "../components/itemDetails.js"

export default function PagePostIndex() {
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
    return (
        <div>
            Post: {id}
            <div className="flex flex-col justify-center items-center">
                <div className="text-2xl">Home</div>
                <ItemDetails id={id} />
            </div>
        </div>)
}
