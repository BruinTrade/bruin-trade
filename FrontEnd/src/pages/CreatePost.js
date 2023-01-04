import React, { useContext } from "react";
import CreatePost from "../components/createPost";
import ProfilePage from "../components/profile";
import { Navigate } from "react-router-dom";
import { useAlert } from 'react-alert'
import { useSelector } from 'react-redux'
import { AuthContext } from "../context/AuthContext";

export default function PageCreatePost() {
    const {currentUser} = useContext(AuthContext);

    const login = currentUser ? true: false
    const alert = useAlert()
    if (!login)
    {
      alert.show("You must login first to view this page")
      return <Navigate to="/login" />;
    }
    
    return (
        <div className='flex flex-row'>
            <div className='mt-60px ml-235px'>
                <div className='pl-25px avenir-med text-gray-500 text-16px mb-10px'>Create your listing</div>
                <CreatePost />
            </div>
        </div>
    );
}