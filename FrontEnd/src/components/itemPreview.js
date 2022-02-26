import React from 'react'
import { Link } from "react-router-dom";
import LongPreview from './itemPreviewLong';

const DUMMY_PRICE = 34.99

export default function ItemPreview(props) {
    return (
        <Link to={`post/${props.itemid}`}>
            <div className='w-250px h-288px flex flex-col item-center justify-between bg-white rounded-12px px-15px'>
                <div>
                    <div className='w-full h-137px rounded-12px mt-10px mx-auto overflow-hidden'>
                        {/*Image*/}
                        <img className='object-cover' src={props.img} />
                    </div>

                    <div className='w-full text-12px mx-auto test-gray-700'>
                        {props.text}
                    </div>
                </div>
                <div className='w-full flex flex-row justify-end mb-11px'>
                    <div className="text-gold" >
                        ${props.price}
                    </div>

                    <button>
                        <img src="./icons/Like.svg" />
                    </button>
                </div>
            </div>
        </Link>
    )
}

export function ItemPreviewList({ itemIds }) {
    return (
        <div className="flex flex-col space-y-20px">
            {itemIds.map(() => (
                <LongPreview />
            ))}
        </div>
    )
}