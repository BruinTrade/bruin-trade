import React from "react";
import { useSelector } from "react-redux";
import get_icon, {Icons} from "./icons_SVG";

function UserProfileMenu(){
    const username = useSelector((state) => state.userInfo.username)
    const profileImage = useSelector((state) => state.userInfo.profileImage);

    return (
        <div className='flex flex-row justify-start items-center w-119px'>
            <div id="ProfileImage" class='w-50px h-50px rounded-full overflow-hidden bg-blue-100'>
                <img src={profileImage} className='w-full h-full object-cover'/>
            </div>
            <div id='message' className='flex flex-col justify-left text-10px text-gray-500 ml-8px font-medium'>
                <div>Hello,</div>
                <div>{username}</div>
            </div>
            <div id="dropdownMenu" className='ml-8px'>
                {get_icon(Icons.dropdown)}
            </div>
        </div>
    );
}

export default UserProfileMenu;