import React from "react";
import { Routes, Route, useParams } from 'react-router-dom';
import ItemDetails from "../components/itemDetails.js"
import { Navigate } from "react-router-dom";
import { useAlert } from 'react-alert'
import { useSelector } from 'react-redux'


export default function PagePostIndex() {
    const login = useSelector((state) => state.loginStatus.login)
    const alert = useAlert()
    if (!login)
    {
      alert.show("You must login first to view this page")
      return <Navigate to="/login" />;
    }

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
            <div className="flex flex-col justify-center items-center">
                <ItemDetails id={id} />
            </div>
        </div>)
}
