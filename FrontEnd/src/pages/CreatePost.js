import React from "react";
import CreatePost from "../components/createPost";

export default function PageCreatePost() {
    return (
<div className='flex flex-row'>
            <div className='mt-60px ml-235px'>
                <div className='pl-25px avenir-med text-gray-500 text-16px mb-10px'>Create your listing</div>
                <CreatePost />
            </div>

            <div className='w-357px h-817px mt-21px ml-40px mr-80px bg-white pt-35px pr-25px pl-25px flex flex-row justify-between rounded-25px'>
            </div>
        </div>
    );
}