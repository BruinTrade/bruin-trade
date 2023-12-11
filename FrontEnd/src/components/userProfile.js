import React from 'react'
import get_icon, { Icons } from './icons_SVG';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
// import UserServices from "../backend_services/user_services.js"



export default function UserProfile(props) {
    const defaultPhotoURL = "https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg";
    let username = props.username
    let profileImage = props.photoURL || defaultPhotoURL;

    let rating = useSelector((state) => state.userInfo.rating);
    const navigate = useNavigate()
    
    function handleOnClick() {
        navigate(`/profile/${props.userId}`)
    }

    return (
        <div onClick={() => handleOnClick()} className='flex flex-col justify-start items-center w-80px'>
            <div id="profileImg" className="w-full h-80px rounded-full overflow-hidden bg-blue-100">
                <img src={profileImage} className="w-full h-full object-cover" alt='placeholder' />
            </div>
            <div id="username" className='flex flex-row justify-center text-16px text-gray-500 mt-10px'>
                {username}
            </div>
            <div id="rating" className='mt-3px w-80px'>
                <UserRating rating={rating}/>
            </div>
        </div>
    );
}

export function UserProfileSmall(props) {

    const defaultPhotoURL = "https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg";
    let username = props.username
    let profileImage = props.photoURL || defaultPhotoURL;

    let rating = useSelector((state) => state.userInfo.rating);
    const navigate = useNavigate()
    
    function handleOnClick(e) {
        e.preventDefault(); 
        navigate(`/profile/${props.userId}`)
    }

    return (
        <div onClick={(e) => handleOnClick(e)} className='flex flex-row items-center justify-center'>
            <div id="profileImg" className="w-40px h-40px rounded-full overflow-hidden bg-blue-100">
                <img src={profileImage} className="w-full h-full object-cover" alt='placeholder' />
            </div>
            <div className='flex flex-col items-start justify-center ml-5px space-y-1'>
                <div id="username" className='text-12px text-gray-400'>
                    {username}
                </div>
                <UserRating rating={rating} small={true}/>
            </div>
        </div>
    );
}


function Star({ proportion }) {
    const size = 10;
    const starIcon = get_icon(Icons.star);
    const partWidth = Math.floor(Math.abs(size * proportion))

    return (
        <div className={`relative w-10px h-10px`}>
            {
                partWidth === 0 ? null :
                <div className={`absolute z-40 left-0 h-${size}px w-${partWidth}px overflow-hidden`}>
                    <div className={`h-${size}px w-${size}px`}>
                        {starIcon}
                    </div>
                </div>
            }
            <div className={`absolute z-10 left-0 top-0 w-${size}px h-${size}px grayscale`}>
                {starIcon}
            </div>
        </div>
    );
}

function UserRating(props) {
    const small = props.small ? props.small : false;
    const rating = props.rating;
    const roundedRating = Math.round(rating)

    const stars = [1, 2, 3, 4, 5].map((i) => {
        if(i < roundedRating || i === rating) return <Star key={i} proportion={1} />
        else if(i > roundedRating) return <Star key={i} proportion={0} />
        else return <Star key={i} proportion={rating - Math.round(rating)}/>
    });

    return (
        <div className={`flex flex-row justify-center h-11px space-x-1${small ? "px" : ""}`}>
            {stars}
        </div>
    );
}
