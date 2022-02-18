import React from 'react'

function CategoryItem(props) {
    return (
        <div className='flex flex-col justify-start items-center w-120px'>
            <div class="w-full h-120px rounded-12px overflow-hidden">
                <img src={props.imgUrl} className="w-full h-full object-cover" />
            </div>
            <div id="label" className='flex flex-row justify-center text-12px text-gray-700 mt-10px'>
                {props.label}
            </div>
        </div>
    );
}


export default CategoryItem;
