import React from 'react'
import get_icon, { Icons } from "./icons_SVG.js"

function userProfile(props){
    return (
        <div className='flex flex-col justify-start items-center w-120px'>
            <div class="w-full h-120px rounded-12px overflow-hidden">
                {get_icon(Icons.userProfile)};
            </div>
            <div id="userName" className='flex flex-row justify-center text-12px text-gray-700 mt-10px'>
                {props.userName}
            </div>
        </div>
    );
}

export default userProfile;