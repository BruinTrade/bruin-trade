import React, { useState } from 'react'
import ConcisePreview from './itemConcisePreview';
import UserProfile from "../components/userProfile.js";
import { useSelector } from 'react-redux'

export default function ProfilePage(props) {

    // Get ordered and sold items from state (Redux)
    const orders = useSelector((state) => state.userInfo.orders)
    const sold = useSelector((state) => state.userInfo.sold)

    // Pesdo Code
    const arr = [{
        id: 1,
        src: 'https://static.wikia.nocookie.net/6d37f599-6b4a-4053-b2f3-be1bb11109ce',
        text: 'hello',
    }]
    const arrorders = [{
        id: 2,
        src: 'https://static.wikia.nocookie.net/6d37f599-6b4a-4053-b2f3-be1bb11109ce',
        text: 'hello',
    },
    {
        id: 3,
        src: 'https://static.wikia.nocookie.net/6d37f599-6b4a-4053-b2f3-be1bb11109ce',
        text: 'This div is for text',
    },
    ]
    const arrsold = [{
        id: 4,
        src: 'https://static.wikia.nocookie.net/6d37f599-6b4a-4053-b2f3-be1bb11109ce',
        text: 'hello',
    }]


    return (
        <div>
            <div className='grid w-163px h-128px mt-40px mx-auto place-items-center'>
                <UserProfile userName="aaaaa" />
            </div>
            <div className='mt-46px grid grid-cols-1'>
                <ViewMore />
            </div>
            <div className='w-311px h-166px mx-auto  grid grid-rows-1 grid-flow-col gap-x-9px overflow-x-auto'>
                <PreviewProfileItems items={arr} />
            </div>
            <div className='grid grid-cols-2'>
                <div className='avenir-med text-gray-500 text-16px'>Orders</div>
                <ViewMore />
            </div>
            <div className='w-311px h-145px'>
                <PreviewProfileItems items={arrorders} />
            </div>
            <div className='grid grid-cols-2'>
                <div className='avenir-med text-gray-500 text-16px mt-11px'>Sold</div>
                <ViewMore />
            </div>
            <div className='w-311px h-145px mx-auto'>
                <PreviewProfileItems items={arrsold} />
            </div>
        </div>
    );
}


function PreviewProfileItems(props) {

    const items = props.items

    return (
        <div className='w-full h-full grid grid-rows-1 grid-flow-col gap-x-9px overflow-x-auto'>
            {items.map((element) => (
                <ConcisePreview itemid={element.id} img={element.src} text={element.text} key={element.id}/>
            ))}
        </div>
    );
}

function ViewMore(props) {
    return (
        <button className='text-blue-400 place-self-end text-10px'>view more</button>
    );
}