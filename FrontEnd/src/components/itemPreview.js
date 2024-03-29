import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import get_icon, { Icons } from "./icons_SVG";
// import ItemServices from "../backend_services/item_services";
// import UserServices from '../backend_services/user_services';
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { setSellingItemsChange } from '../redux/slices/sellingItemsChange';
import { UserProfileSmall } from './userProfile';
import { useStateIfMounted } from "use-state-if-mounted"
import { AuthContext } from '../context/AuthContext';
import { getDoc, doc, deleteDoc, onSnapshot, updateDoc, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';


// const previewTypes = {
//     long : "long",
//     short : "short"
// }

// const ItemPreview = {
//     Short : (id) => ItemDataProvider(previewTypes.short, id),
//     Long : (id) => ItemDataProvider(previewTypes.long, id)
// }

function useItemDataProvider({ item_id }) {

    const token = useSelector((state) => state.loginStatus.token)
    const user_location = useSelector((state) => state.userInfo.location)
    const navigate = useNavigate()
    const alert = useAlert()

    const [title, setTitle] = useStateIfMounted("");
    const [price, setPrice] = useStateIfMounted(0);
    const [description, setDesc] = useStateIfMounted("");
    const [images, setImages] = useStateIfMounted([])
    const [itemOwner, setItemOwner] = useStateIfMounted("")
    const [itemOwnerId, setItemOwnerId] = useStateIfMounted("")
    const [location, setLoc] = useStateIfMounted("")
    const [condition, setCond] = useStateIfMounted("")
    const [category, setCategory] = useStateIfMounted("")


    useEffect(() => {
        // Get RealTime Update from Firestore
        const getItem = () => {
            const unsub = onSnapshot(doc(db, "products", item_id), (doc) => {
                const data = doc.data();
                setTitle(data.title)
                let temp_description = data.description
                if (temp_description && temp_description.length > 300) {
                    temp_description = (temp_description.slice(0, 300)) + "..."
                }
                setDesc(temp_description)
                setPrice(data.price)
                setImages(data.images)
                setItemOwner(data.sellerName)
                setItemOwnerId(data.seller)
                setCond(data.condition)
                setCategory(data.categoryTag)
                setLoc(data.location)
            });

            return () => {
                unsub();
            };
        };

    item_id && getItem();
    }, [item_id])

    return { title, price, description, images, itemOwner, itemOwnerId, location, condition, category }
}

function ItemPreviewLoading() {
    return <div className='w-258px h-288px flex flex-col item-center justify-center bg-white rounded-12px px-15px text-gray-300'>Loading...</div>
}


export function ItemPreviewShort({ item_id }) {

    const { title, price, _, images, itemOwner, __, ___, ____ } = useItemDataProvider({ item_id: item_id })

    if (title === null) {
        return <ItemPreviewLoading />
    }
    return (
        <Link to={`post/${item_id}`}>
            <div className='w-258px h-288px flex flex-col item-center justify-between bg-white rounded-12px px-15px'>
                <div>
                    <div className='w-full h-137px rounded-12px mt-10px mx-auto overflow-hidden'>
                        <img className='object-cover' src={images ? images[0] : null} alt='placeholder' />
                    </div>
                    <div className='w-full text-12px mx-auto mt-15px test-gray-700'>
                        {title}
                    </div>
                </div>
                <div className='w-full flex flex-row justify-between items-end mb-11px'>
                    <UserProfileSmall username={itemOwner} />
                    <div className="text-gold" >
                        ${price}
                    </div>
                </div>
            </div>
        </Link>
    )
}


export function ItemPreviewLong({ item_id, hasDeleteButton }) {

    const { currentUser } = useContext(AuthContext);

    const { title, price, description, images, itemOwner, itemOwnerId, location, condition, _ } = useItemDataProvider({ item_id: item_id })

    const token = useSelector((state) => state.loginStatus.token)
    const userId = currentUser ? currentUser.uid : null;

    const navigate = useNavigate()
    const alert = useAlert()
    const dispatch = useDispatch()

    function removePost() { }
    function addToWatchList() { }

    async function deleteItemHandler() {
        await deleteDoc(doc(db, "products", item_id)).then(() => {
            alert.show(title, " has been DELETED!");
        }).catch((err) => {
            console.log(err)
        });

        await updateDoc(doc(db, "users", itemOwnerId), {
            sellingItems: arrayRemove(item_id)
        });
    }

    let local_hasDeleteButton
    if (userId === itemOwnerId) {
        local_hasDeleteButton = hasDeleteButton
    }
    else {
        local_hasDeleteButton = false
    }



    return (
        <Link to={`/post/${item_id}`}>
            <div className='w-1000px h-288px flex flex-row items-center justify-start bg-white rounded-12px pl-15px pr-30px'>
                <div id="image" className="flex-shrink-0 flex flex-col justify-center items-center w-260px h-260px border border-1px border-gray-100 rounded-12px object-cover overflow-hidden">
                    <img src={images} alt='placeholder' />
                </div>
                <div id="detail" className="grow flex flex-col justify-start ml-10px">
                    <div id="upper" className="flex flex-col items-start mb-10px">
                        <div id="title" className="w-auto text-18px text-gray-700 mb-5px">
                            {title}
                        </div>
                        <UserProfileSmall username={itemOwner} />
                        {/*
                        <div id="status" className="w-80px ml-10px flex flex-col space-y-2px">                          
                            <Status type="watching" num={numWatching} />
                            <Status type="likes" num={numLikes} />
                        </div>
                        */}
                    </div>
                    <div className='flex flex-row space-x-35px'>
                        <div id="left" className='flex-shrink-0 flex flex-col justify-start items-start'>
                            <StatusLabel title="Condition">
                                <div className="text-gray-500 text-14px leading-none">{condition}</div>
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
                        <div id="right" className='w-full flex flex-col justify-between'>
                            <StatusLabel title="Description">
                                <div className="text-12px text-gray-500">{description}</div>
                            </StatusLabel>

                            <div id="buttons" className="flex flex-row justify-end space-x-15px mb-5px">

                                {
                                    local_hasDeleteButton ? <button type="button" className="text-red-400 text-14px border border-1 border-red-400 rounded-6px px-2 py-1" onClick={(e) => { e.preventDefault(); deleteItemHandler() }}>Delete Item</button>
                                        :
                                        <div></div>
                                }
                                {/* {buttonsOthersPost} */}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Link>
    )
}

function StatusLabel({ title, children }) {
    return (
        <div className="flex flex-col items-start space-y-2px mb-10px">
            <div className="text-12px text-gray-400">{title}:</div>
            {children}
        </div>
    )
}

export function ItemPreviewList(props) {
    const previewType = props.type ? props.type : "long"
    const itemIds = props.itemIds ? props.itemIds : []
    const autoScroll = props.autoScroll ?? false;
    const refs = {}

    function moveToItem(id) {
        setTimeout(() => {
            console.log("move to ", id)
            refs[itemIds[id]].current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
            });
            id += 1
            moveToItem(id % itemIds.length)
        }, 3000)
    }

    useEffect(() => {
        if (previewType !== "long" && autoScroll) {
            moveToItem(0)
        }
    }, [])

    return (
        <div className={`${previewType === "long" ? "flex flex-col space-y-20px" : "w-955px h-336px pl-27px rounded-25px grid grid-rows-1 grid-flow-col-dense gap-x-17px overflow-x-auto"}`}>
            {itemIds.length === 0 ?
                <div className='w-full h-200px flex flex-row justify-center items-center text-16px text-gray-300'>{props.placeholder ? props.placeholder : "No Item Found"}</div>
                :
                itemIds.map((id) => {
                    if (previewType === "long")
                        return <ItemPreviewLong key={id} item_id={id} hasDeleteButton={props.hasDeleteButton} />
                    else {
                        let ref = null;
                        if (autoScroll) {
                            ref = React.createRef()
                            refs[id] = ref
                        }
                        return <div ref={ref} key={id}>
                            <ItemPreviewShort key={id} item_id={id} />
                        </div>
                    }
                })
            }
        </div>
    )
}
