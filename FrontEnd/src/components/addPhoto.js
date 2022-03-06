import React, {useState} from "react";
import { useSelector } from "react-redux";
import UploadImage from "./uploadImage";

function PhotoPreview(props) {
    return (
        <div className="w-112px h-80px rounded-8px">
            <img src={props.imgUrl} className="w-full h-full object-cover" />
        </div>
    );
}

export default function PhotoUpload(props) {
    let profileImage = useSelector((state) => state.userInfo.profileImage)

    return (
        <div className='flex flex-col justify-start items-center w-100px'>
            <label className='avenir-med text-14px text-left'>
                Photos Image
            </label>

            <input type="file" onChange={(event) => props.handleUploadImage(event)} multiple className="absolute block opacity-0 z-20 w-20px h-20px left-0 top-0" />
            <div id="profileImg" className="w-80px h-80px rounded-full overflow-hidden bg-blue-100 mt-10px">
                {profileImage}
            </div>

            <div className="w-112px h-80px rounded-8px mt-10px">
                <UploadImage handleUploadImage={(event) => props.handleUploadImage(event)}/>
            </div>
        </div>
    );
}