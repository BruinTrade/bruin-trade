import React, { useState } from 'react'
import Form from "./form.js";
import ItemServices from "../backend_services/item_services.js";
import { useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import UploadImage from "./uploadImage.js";
import { useNavigate } from 'react-router-dom';


const conditions = ["Great", "Good", "Poor"];
const categories = ["Books", "Music", "Fashion", "Computers", "Audios", "Toys", "Furnitures", "Electronics", "Other"]

export default function CreatePost() {
    const alert = useAlert()
    const navigate = useNavigate()
    const [title, setTitleState] = useState("");
    const [location, setLocationState] = useState("");
    const [price, setPriceState] = useState("");
    const [categoryTag, setCategoryTagState] = useState(categories[8]);
    const [description, setDescriptionState] = useState("");
    const [condition, setConditionState] = useState(conditions[0]);
    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);


    const username = useSelector((state) => state.userInfo.username)
    const token = useSelector((state) => state.loginStatus.token)

    async function handleCreatePost() {
        let isvalid = true
        if (title === "") {
            alert.show("Please provide a title")
            isvalid = false
        }

        if (location === "") {
            alert.show("Please provide a location")
            isvalid = false
        }

        if (price === "") {
            alert.show("Please provide a price")
            isvalid = false
        }

        if (description === "") {
            alert.show("Please provide a description")
            isvalid = false
        }

        if (!isvalid) {
            return
        }

        // console.log("Create Item")
        // console.log("token from call: " + token);
        const res = await ItemServices.create(
            username,
            token,
            title,
            price,
            description,
            images,
            condition,
            location,
            categoryTag
        );
        // console.log(res);
        navigate("/about")
    }

    function handleUploadImage(event) {
        setImages([...images, ...event.target.files])
        const newUrls = [...event.target.files].map((file, key) => { return URL.createObjectURL(file) })
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
                required={true} />

            <div className='flex flex-row justify-between w-full'>

                <div className='grid gap-y-50px w-300px'>
                    <Form id="location"
                        label="Location"
                        placeholder="Your current location"
                        value={location}
                        onChange={(event) => setLocationState(event.target.value)}
                        type="text"
                        required={true} />
                    <Form id="price"
                        label="Price Tag"
                        placeholder="Desired price for the item"
                        value={price}
                        onChange={(event) => setPriceState(event.target.value)}
                        type="text"
                        required={true} />
                    <Form id="condition"
                        label="Condition"
                        formType="selection"
                        options={conditions}
                        selected={condition}
                        onChange={setConditionState}
                        required={true} />
                    <Form id="category"
                        label="Category"
                        formType="selection"
                        options={categories}
                        selected={categoryTag}
                        onChange={setCategoryTagState}
                        required={true} />
                </div>

                <div className='flex flex-col justify-start item-start ml-60px w-full'>
                    <PhotoUpload urls={imageUrls} handleUploadImage={(event) => handleUploadImage(event)} />
                </div>
            </div>

            <Form id="description"
                label="Description"
                width={750}
                height={200}
                placeholder="Description of the item"
                value={description}
                onChange={(event) => setDescriptionState(event.target.value)}
                type="text"
                required={true} />

            <div className='flex flex-row justify-end mt-30px'>
                <button onClick={() => handleCreatePost()} className="w-150px h-50px rounded-full bg-blue-400 text-18px text-white bottom-0 right-0 mb-30px hover:bg-blue-500 active:bg-blue-700">
                    Post
                </button>
            </div>
        </div>
    );
}


// !!!! Images with HEIC and sometimes PNG fail to load

function PhotoPreview(props) {
    return (
        props.main ?
            <div className="w-390px h-200px rounded-8px">
                <img src={props.imgUrl} className="w-full h-full object-contain" />
            </div> :
            <div className="w-112px h-80px rounded-8px">
                <img src={props.imgUrl} className="w-full h-full object-cover" />
            </div>
    );
}

function PhotoUpload(props) {

    // const images = props.urls.map((url) => (<PhotoPreview imgUrl={url} />))
    const arr = [0, 1, 2, 3, 4, 5]
    return (
        <div>
            <label className='avenir-med text-14px text-left'>
                Photos:
            </label>
            <div className='w-390px h-200px bg-white rounded-12px border-solid border-gray-100 border-2'>
                {props.urls.length != 0 ? <PhotoPreview imgUrl={props.urls[0]} main={true} /> : ''}
            </div>
            <div className="grid grid-cols-3 grid-rows-2 gap-x-28px gap-y-20px mt-16px">
                {/*images*/}
                {arr.map((element) => (
                    element === props.urls.length ?
                        <div className='w-112px h-80px bg-gray-100 rounded-8px overflow-hidden grid items-center justify-center'>
                            <UploadImage handleUploadImage={(event) => props.handleUploadImage(event)} />
                        </div> :
                        <div className='w-112px h-80px bg-gray-100 rounded-8px overflow-hidden grid items-center justify-center'>
                            {element < props.urls.length ? <PhotoPreview imgUrl={props.urls[element]} main={false} /> : ""}
                        </div>
                ))}
            </div>
            {console.log(props.urls)}
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
