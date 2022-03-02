import React from 'react'
import get_icon, { Icons } from './icons_SVG';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

export default function UserProfile(props) {
    let username = useSelector((state) => state.userInfo.username)
    username = props.username ? props.username : username
    const profileImage = useSelector((state) => state.userInfo.profileImage)
    const rating = useSelector((state) => state.userInfo.rating);

    const navigate = useNavigate()
    
    function handleOnClick() {
        navigate(`/profile/${username}`)
    }

    return (
        <div onClick={() => handleOnClick()} className='flex flex-col justify-start items-center w-80px'>
            <div id="profileImg" className="w-full h-80px rounded-full overflow-hidden bg-blue-100">
                <img src={profileImage} className="w-full h-full object-cover" />
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

function Star({ proportion }) {
    const size = 10;
    const starIcon = get_icon(Icons.star);
    const partWidth = Math.floor(Math.abs(size * proportion))

    return (
        <div className={`relative w-${size}px h-${size}px`}>
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
    const rating = props.rating;

    const roundedRating = Math.round(rating)
    const stars = [1, 2, 3, 4, 5].map((i) => {
        if(i < roundedRating || i === rating) return <Star proportion={1} />
        else if(i > roundedRating) return <Star proportion={0} />
        else return <Star proportion={rating - Math.round(rating)}/>
    });

    return (
        <div className='flex flex-row justify-center h-11px space-x-1'>
            {stars}
        </div>
    );
}
