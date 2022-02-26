import React from "react";
import { Link } from "react-router-dom";
import get_icon, { Icons } from "./icons_SVG";

function LongPreview(props) {
    const fakeurl = "https://static.wikia.nocookie.net/6d37f599-6b4a-4053-b2f3-be1bb11109ce"
    const defaultname = "This items' name is missing"

    const imageUrl = fakeurl
    const title = "Maison Margiela Replica By The Fireplace EDT Perfume Travel Splash .20 oz / 7ml"
    const numWatching = 10;
    const numLikes = 2;
    const condtion = "Great";
    const location = "Westwood, CA";
    const price = 102;
    const description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."

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


    return (
        <Link to={`/post/${props.id}`}>
            <div className='w-1000px h-288px flex flex-row items-center justify-start bg-white rounded-12px px-15px'>
                <div id="image" className="w-260px h-260px border border-1px border-gray-100 rounded-12px flex flex-col justify-center object-cover">
                    <img src={imageUrl} />
                </div>
                <div id="detail" className="flex flex-col justify-start ml-10px">
                    <div id="upper" className="flex flex-row ">
                        <div id="title" className="w-auto text-18px text-gray-700 mb-10px">
                            {title}
                        </div>
                        <div id="status" className="w-80px ml-10px flex flex-col space-y-2px">
                            <Status type="watching" num={numWatching} />
                            <Status type="likes" num={numLikes} />
                        </div>
                    </div>
                    <div id="middle" className="flex flex-row">
                        <div id="left" className="w-163px">
                            <StatusLabel title="Condition">
                                <div className="text-gray-500 text-14px">{condtion}</div>
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
                        <div className="text-gray-300 text-12px">user profile</div>
                        <div id="buttons" className="flex flex-row space-x-15px">
                            {buttonsOthersPost}
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

export default LongPreview;


                // <div className='w-250px h-260px rounded-12px mt-14px overflow-hidden'>
                //     {/*Image*/}
                //     <img src={props.img ? props.img : fakeurl} className='w-full' />
                // </div>
                // <div className="ml-11px mt-20px">
                //     <div>
                //         <div className='text-18px mx-auto test-gray-700'>
                //             {props.name ? props.name : defaultname}
                //         </div>
                //     </div>
                // </div>
