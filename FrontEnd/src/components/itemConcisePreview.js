import React from "react";

function ConcisePreview({ props }) {
    return (
        <div className='w-164px h-135px flex flex-col item-center justify-between bg-white rounded-12px px-15px'>
            <div>
                <div className='w-154px h-80px rounded-12px mt-5px mx-auto'>
                    {/*Image*/}
                    <img src='https://bruinbound.ucla.edu/assets/images/bruin-bear-full.png' />
                </div>

                <div className='w-full text-10px mx-auto mt-5px test-gray-700'>
                    This div is for text hsidhaishdiashdi
                </div>
            </div>
        </div>
    )
}


export default ConcisePreview;