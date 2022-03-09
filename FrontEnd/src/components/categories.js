import React from "react";
import CategoryItem from "./categoryItem";

export default function Categories(props) {

    // hard code - get categorie names and corresponding images
    const tags =[
        {
            label: "Books",
            imgUrl: "https://images.unsplash.com/photo-1618365908648-e71bd5716cba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        },
        {
            label: "Music",
            imgUrl: "https://images.unsplash.com/photo-1619983081563-430f63602796?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
        },
        {
            label: "Fashion",
            imgUrl: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80"
        },
        {
            label: "Computers",
            imgUrl: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
        },
        {
            label: "Audios",
            imgUrl: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        },
        {
            label: "Toys",
            imgUrl: "https://images.unsplash.com/photo-1636729021276-364d16c1329a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3087&q=80"
            // imgUrl: "https://images.unsplash.com/photo-1636729021343-52771f1ce0a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        },
        {
            label: "Furnitures",
            imgUrl: "https://images.unsplash.com/photo-1616464917528-00525c081b89?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
        },
        {
            label: "Electronics",
            imgUrl: "https://images.unsplash.com/photo-1620783770629-122b7f187703?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
        },
    ]

    return (
        <div>
            <div className='w-955px h-460px bg-white pt-30px rounded-25px'>
                <div className='pl-25px avenir-med text-gray-500 text-20px mb-10px'>Categories</div>
                <div className='ml-88px mr-67px mt-20px h-341px grid grid-rows-2 grid-flow-col gap-x-50px gap-y-35px'>
                    {tags.map((tag) => (
                        <CategoryItem label={tag.label} imgUrl={tag.imgUrl} key={tag.label}/>
                    ))}
                </div>
            </div>
        </div>
    );
}