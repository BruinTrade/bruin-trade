import React, { useState } from 'react'
import Form from "./form.js";
import ItemServices from "../backend_services/item_services.js";
import { useSelector } from 'react-redux'

import UploadImage from "./uploadImage.js";

const conditions = ["Great", "Good", "Poor"];


export default function CreatePost() {

    const [title, setTitleState] = useState("");
    const [location, setLocationState] = useState("");
    const [price, setPriceState] = useState("");
    const [condition, setConditionState] = useState(conditions[0]);
    const [categoryTag, setCategoryTagState] = useState([]);
    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [description, setDescriptionState] = useState("");

    const username = useSelector((state) => state.userInfo.username)
    const token = useSelector((state) => state.loginStatus.token)

    async function handleCreatePost() {
        console.log("Create Item")
        console.log("token from call: " + token);
        const res = await ItemServices.create(
            username,
            token,
            title,
            price,
            description,
            images
        );
        console.log(res);
    }

    function handleUploadImage(event) {
        setImages([...images, ...event.target.files])
        const newUrls = [...event.target.files].map((file, key) => {return URL.createObjectURL(file)})
        setImageUrls([...imageUrls, ...newUrls])
    }

    return (
        <div className='w-800px h-960px bg-white pt-35px pr-25px pl-25px rounded-25px space-y-50px'>

            <Form id="title" 
                label="Title" 
                placeholder="Name of the item" 
                value={title} 
                onChange={(event) => setTitleState(event.target.value)} 
                type="text" 
                width={750}
                required={true}/>

            <div className='flex flex-row justify-between w-full'>

                <div className='grid gap-y-50px w-300px mr-60px'>
                    <Form id="location" 
                        label="Location" 
                        placeholder="Your current location" 
                        value={location} 
                        onChange={(event) => setLocationState(event.target.value)} 
                        type="text" 
                        required={true}/>
                    <Form id="price" 
                        label="Price Tag" 
                        placeholder="Desired price for the item" 
                        value={price} 
                        onChange={(event) => setPriceState(event.target.value)} 
                        type="text" 
                        required={true}/>
                    <Form id="condition"
                        label="Condition"
                        formType="selection"
                        options={conditions}
                        selected={condition}
                        onChange={setConditionState}
                        required={true}/>
                </div>

                <div className='flex flex-col justify-start item-start ml-60px w-full'>

                    <PhotoUpload urls={imageUrls} handleUploadImage={(event) => handleUploadImage(event)}/>
                </div>
            </div>

            <Form id="description" 
                label="Description" 
                width={750}
                height={200}
                placeholder="Optional description of the item" 
                value={description} 
                onChange={(event) => setDescriptionState(event.target.value)} 
                type="text"/>

            <div className='flex flex-row justify-end mt-30px'>
                <button onClick={ () => handleCreatePost() } className="w-150px h-50px rounded-full bg-blue-400 text-18px text-white bottom-0 right-0 mb-30px hover:bg-blue-500 active:bg-blue-700">
                    Post
                </button>
            </div>
        </div>
    );
}



function PhotoPreview(props) {
    return (
        <div className="w-112px h-80px rounded-8px">
            <img src={props.imgUrl} className="w-full h-full object-cover" />
        </div>
    );
}

function PhotoUpload(props) {

    const images = props.urls.map((url) => (<PhotoPreview imgUrl={url}/>))

    return (
        <div>
            <label className='avenir-med text-14px text-left'>
                Photos:
            </label>

            <div className="grid grid-cols-3 grid-rows-2">
                {images}
            </div>

            <div className="w-112px h-80px rounded-8px">
                <UploadImage handleUploadImage={(event) => props.handleUploadImage(event)}/>
            </div>
        </div>
    );
}


/*
<label className='avenir-med text-14px'>
                                Condition:
                                <select className='bg-gray-100 rounded-25px w-full h-40px text-center px-3 py-2'>
                                    <option value="Great">Great</option>
                                    <option value="Good">Good</option>
                                    <option value="Fair">Fair</option>
                                </select>
                            </label>
<label className='avenir-med text-14px'>
                            Description:
                            <textarea type={"text"} name="description" className='bg-gray-100 rounded-25px w-full h-221px px-3 py-2' />
                        </label>
*/