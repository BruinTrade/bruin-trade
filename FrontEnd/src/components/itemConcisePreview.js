import React from "react";
import { Link } from "react-router-dom";

function ConcisePreview(props) {
    const fakeurl = "https://static.wikia.nocookie.net/6d37f599-6b4a-4053-b2f3-be1bb11109ce";
    return (
        <Link to={`post/${props.itemid}`}>
            <div className='w-164px h-135px flex flex-col item-center justify-between bg-white rounded-12px px-15px'>
                <div>
                    <div className='w-154px h-80px rounded-12px mt-5px mx-auto overflow-hidden'>
                        {/*Image*/}
                        <img src={props.img? props.img : fakeurl} alt='placeholder' />
                    </div>

                    <div className='w-full text-10px mx-auto mt-5px test-gray-700'>
                        {props.text}
                    </div>
                </div>
            </div>
        </Link>
    )
}


export default ConcisePreview;