import React from "react";
import CategoryItem from "./categoryItem";

export default function Categories(props) {

    // API - get categorie names and corresponding images
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    return (
        <div>
            <div className='w-955px h-460px bg-white pt-30px rounded-25px'>
                <div className='pl-25px avenir-med text-gray-500 text-20px mb-10px'>Categories</div>
                <div className='ml-88px mr-67px mt-20px h-341px grid grid-rows-2 grid-flow-col gap-x-50px gap-y-35px'>
                    {arr.map(() => (
                        <CategoryItem label="Books" imgUrl="https://media.wired.com/photos/5be4cd03db23f3775e466767/master/w_120"/>
                    ))}
                </div>
            </div>
        </div>
    );
}