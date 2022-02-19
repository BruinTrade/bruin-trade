import React, { useState } from 'react'
import ConcisePreview from './itemConcisePreview';

export default function ProfilePage(props){
    return(
        <div>
            <div className='w-163px h-128px bg-gold mt-40px mx-auto'>

            </div>
            <div className='w-311px h-166px bg-blue-100 mt-51px mx-auto'>
                <ConcisePreview />
            </div>
            <div className='avenir-med text-gray-500 text-16px'>Orders</div>
            <div className='w-311px h-145px bg-green-100'>
                <ConcisePreview />
            </div>
            <div className='avenir-med text-gray-500 text-16px mt-11px'>Create your listing</div>
            <div className='w-311px h-145px bg-red-100 mx-auto'>
                <ConcisePreview />
            </div>
        </div>
    );
}