import React, { useState } from 'react'
import ConcisePreview from './itemConcisePreview';

export default function ProfilePage(props) {

    const arr = [1, 2, 3]
    return (
        <div>
            <div className='w-163px h-128px bg-gold mt-40px mx-auto'>

            </div>
            <div className='w-311px h-166px bg-blue-100 mt-51px mx-auto  grid grid-rows-1 grid-flow-col gap-x-9px overflow-x-auto'>
                {arr.map(() => (
                    <ConcisePreview />
                ))}
            </div>
            <div className='avenir-med text-gray-500 text-16px'>Orders</div>
            <div className='w-311px h-145px bg-green-100'>
                <PreviewProfileItems />
            </div>
            <div className='avenir-med text-gray-500 text-16px mt-11px'>Create your listing</div>
            <div className='w-311px h-145px bg-red-100 mx-auto'>
                <PreviewProfileItems />
            </div>
        </div>
    );
}


function PreviewProfileItems(props) {

    const arr = [1, 2, 3]

    return (
        <div className='w-full h-full grid grid-rows-1 grid-flow-col gap-x-9px overflow-x-auto'>
            {arr.map(() => (
                <ConcisePreview />
            ))}
        </div>
    );
}