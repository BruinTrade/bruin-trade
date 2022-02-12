import React from 'react'

function CategoryItem(props) {
    return (
        <div>
            <div class={`w-120px h-120px rounded-12px bg-no-repeat bg-cover bg-[url('https://media.wired.com/photos/5be4cd03db23f3775e466767/master/w_120')]`}></div>
            <div id="label" className='flex flex-row justify-center text-12px text-gray-700 mt-10px'>
                {props.label}
            </div>
        </div>


    );
}


export default CategoryItem;
