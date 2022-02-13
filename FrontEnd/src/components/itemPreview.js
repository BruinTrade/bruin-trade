import React from 'react'

const DUMMY_PRICE = 34.99

function ItemPreview({ props }) {
    return (
        <div className='w-250px h-288px flex flex-col item-center justify-between bg-white rounded-12px px-15px'>
            <div>
                <div className='w-full h-137px rounded-12px mt-10px mx-auto'>
                    {/*Image*/}
                    <img src='https://bruinbound.ucla.edu/assets/images/bruin-bear-full.png' />
                </div>

                <div className='w-full text-12px mx-auto test-gray-700'>
                    This div is for text
                </div>
            </div>
            <div className='w-full flex flex-row justify-end mb-11px'>
                <div className="text-gold" >
                    ${DUMMY_PRICE.toString()}
                </div>
                
                <button>
                    <img src="./icons/Like.svg"/>
                </button>
            </div>
        </div>
    )
}


export default ItemPreview;