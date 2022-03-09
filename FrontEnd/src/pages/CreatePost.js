import React from "react";
import CreatePost from "../components/createPost";
import ProfilePage from "../components/profile";
import { Navigate } from "react-router-dom";
import { useAlert } from 'react-alert'
import { useSelector } from 'react-redux'

export default function PageCreatePost() {
    const login = useSelector((state) => state.loginStatus.login)
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

            {/* <div className='w-357px h-817px mt-20px ml-40px mr-80px bg-white pt-35px pr-25px pl-25px flex flex-row justify-between rounded-25px'>
                <ProfilePage />
            </div> */}
        </div>
    );
}