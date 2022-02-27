import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import get_icon, { Icons } from "./icons_SVG";
import ItemServices from "../backend_services/item_services";

// const previewTypes = {
//     long : "long",
//     short : "short"
// }

// const ItemPreview = {
//     Short : (id) => ItemDataProvider(previewTypes.short, id),
//     Long : (id) => ItemDataProvider(previewTypes.long, id)
// }

export default ItemDataProvider;

function ItemDataProvider(previewType, item_id) {

    let cond = "Great";
    let loc = "UCLA";
  
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [desc, setDesc] = useState("");
    const [images, setImages] = useState([])
    const [tags, setTags] = useState([])
    const [itemOwner, setItemOwner] = useState("")

    //let title, price, desc, images, tags, itemOwner
    const token = useSelector((state) => state.loginStatus.token)
    console.log(item_id)

    useEffect(() => {
        ItemServices.getItemDetailsById(item_id, token).then((res) => {
            const data = res.data
            console.log("data", data)
            setTitle(data.title)
            let temp_description = data.description
            if (temp_description.length > 300)
            {
                temp_description = (temp_description.slice(0, 300)) + "..."
            }
            setDesc(temp_description)
            setPrice(data.price)
            setImages(data.images)
            setItemOwner(data.owner)
            // title = data.title
            // desc = data.description
            // price = data.price
            // images = data.images
            // itemOwner = data.owner
            setLoading(false);
        })
    }, [])

    if(loading) return <div/>
    
    if(previewType === "long")
        return <ItemPreviewLong id={item_id} title={title} price={price} description={desc} images={images ? images[0] : null} itemOwner={itemOwner} condition={cond} location={loc} />
    else if(previewType === "short")
        return <ItemPreviewShort id={item_id} title={title} price={price} image={images ? images[0] : null} itemOwner={itemOwner} />
    else
        return <div/>
}


export function ItemPreviewShort({ id, title, price, image }) {
    return (
        <Link to={`post/${id}`}>
            <div className='w-250px h-288px flex flex-col item-center justify-between bg-white rounded-12px px-15px'>
                <div>
                    <div className='w-full h-137px rounded-12px mt-10px mx-auto overflow-hidden'>
                        <img className='object-cover' src={image} />
                    </div>

                    <div className='w-full text-12px mx-auto test-gray-700'>
                        {title}
                    </div>
                </div>
                <div className='w-full flex flex-row justify-end mb-11px'>
                    <div className="text-gold" >
                        ${price}
                    </div>
                </div>
            </div>
        </Link>
    )
}


export function ItemPreviewLong({ id, title, price, images, itemOwner, condition, location, description }) {
    // console.log(id)
    // console.log(title)
    // console.log(price)
    // console.log(images)
    // console.log(itemOwner)
    // console.log(condition)
    // console.log(location)
    // console.log(description)

    // const numWatching = 10;
    // const numLikes = 2;

    function editPost() { }
    function removePost() { }

    function addToWatchList() { }

    const buttonsMyPost = [
        <button type="button" className="text-12px text-red-500" onClick={() => editPost()}>edit</button>,
        <button className="text-12px text-gray-400" onClick={() => removePost()}>remove</button>
    ]

    const buttonsOthersPost = [
        <button type="button" className="text-blue-400 text-14px border border-1 border-blue-400 rounded-6px px-2 py-1" onClick={(e) => {e.preventDefault(); console.log("bob") ;addToWatchList()}}>Add to Watch List</button>
    ]
    console.log(images)
    return (
        <Link to={`/post/${id}`}>
            <div className='w-1000px h-288px flex flex-row items-center justify-start bg-white rounded-12px pl-15px pr-30px'>
                <div id="image" className="w-260px h-260px border border-1px border-gray-100 rounded-12px flex flex-col justify-center object-cover">
                    <img src={images} />
                </div>
                <div id="detail" className="grow flex flex-col justify-start ml-10px">
                    <div id="upper" className="flex flex-row ">
                        <div id="title" className="w-auto text-18px text-gray-700 mb-10px">
                            {title}
                        </div>
                         {/*
                        <div id="status" className="w-80px ml-10px flex flex-col space-y-2px">                          
                            <Status type="watching" num={numWatching} />
                            <Status type="likes" num={numLikes} />
                        </div>
                        */}
                    </div>
                    <div id="middle" className="flex flex-row">
                        <div id="left" className="w-163px">
                            <StatusLabel title="Condition">
                                <div className="text-gray-500 text-14px">{condition}</div>
                            </StatusLabel>
                            <StatusLabel title="Location">
                                <div className="flex flex-row space-x-4px text-14px text-gray-500">
                                    <div className="w-20px h-20px">{get_icon(Icons.location)}</div>
                                    {location}
                                </div>
                            </StatusLabel>
                            <StatusLabel title="Price">
                                <div className="text-gold text-24px leading-none">${price}</div>
                            </StatusLabel>
                        </div>
                        <div id="right" className="w-420px">
                            <StatusLabel title="Description">
                                <div className="text-12px text-gray-500">{description}</div>
                            </StatusLabel>
                        </div>
                    </div>
                    <div id="lower" className="flex flex-row justify-between">
                        <div className="text-gray-300 text-12px">{itemOwner}</div>
                        <div id="buttons" className="flex flex-row space-x-15px">
                            {/* {buttonsOthersPost} */}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}


function Status({ num, type }) {
    return (
        <div className="flex flex-row justify-end text-gray-400 text-12px">
            {num} {type}
        </div>
    );
}


function StatusLabel({ title, children }) {
    return (
        <div className="flex flex-col items-start space-y-2px mb-10px">
            <div className="text-12px text-gray-400">{title}:</div>
            {children}
        </div>
    )
}


export function ItemPreviewList({ itemIds, type }) {
    type = type ? type : "long"
    itemIds = itemIds ? itemIds : []
    return (
        <div className={`${type === "long" ? "flex flex-col space-y-20px" : "w-955px h-336px pl-27px rounded-25px grid grid-rows-1 grid-flow-col-dense gap-x-17px overflow-x-auto"}`}>
            {itemIds.map((id) => (
                ItemDataProvider(type, id)
            ))}
        </div>
    )
}
