import React from "react";
import { Link } from "react-router-dom";

function LongPreview(props) {
    const fakeurl = "https://static.wikia.nocookie.net/6d37f599-6b4a-4053-b2f3-be1bb11109ce"
    const defaultname = "This items' name is missing"
    return (
        <Link to={`post/${props.itemid}`}>
            <div className='w-1000px h-288px flex flex-row item-start justify-start bg-white rounded-12px px-15px'>
                <div className='w-250px h-260px rounded-12px mt-14px overflow-hidden'>
                    {/*Image*/}
                    <img src={props.img ? props.img : fakeurl} className='w-full' />
                </div>
                <div className="ml-11px mt-20px">
                    <div>
                        <div className='text-18px mx-auto test-gray-700'>
                            {props.name ? props.name : defaultname}
                        </div>
                    </div>
                </div>
            </div>
        </Link >
    )
}


export default LongPreview;