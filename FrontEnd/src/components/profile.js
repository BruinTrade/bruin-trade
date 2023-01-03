import React, { useContext } from 'react'
import ConcisePreview from './itemConcisePreview';
import UserProfile from "../components/userProfile.js";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { InfoPages, SettingPages, PageNames } from './profileDetails';

import { AuthContext } from '../context/AuthContext';


export default function ProfilePage(props) {

    // Get ordered and sold items from state (Redux)
    const orders = useSelector((state) => state.userInfo.orders)
    const sold = useSelector((state) => state.userInfo.sold)

    // Pesdo Code
    const arr = [{
        id: 1,
        src: 'https://static.wikia.nocookie.net/6d37f599-6b4a-4053-b2f3-be1bb11109ce',
        text: 'hello',
    }]
    const arrorders = [{
        id: 2,
        src: 'https://static.wikia.nocookie.net/6d37f599-6b4a-4053-b2f3-be1bb11109ce',
        text: 'hello',
    },
    {
        id: 3,
        src: 'https://static.wikia.nocookie.net/6d37f599-6b4a-4053-b2f3-be1bb11109ce',
        text: 'This div is for text',
    },
    ]
    const arrsold = [{
        id: 4,
        src: 'https://static.wikia.nocookie.net/6d37f599-6b4a-4053-b2f3-be1bb11109ce',
        text: 'hello',
    }]


    return (
        <div>
            <div className='grid w-163px h-128px mt-40px mx-auto place-items-center'>
                <UserProfile userName="aaaaa" />
            </div>
            <div className='mt-46px grid grid-cols-1'>
                <ViewMore />
            </div>
            <div className='w-311px h-166px mx-auto  grid grid-rows-1 grid-flow-col gap-x-9px overflow-x-auto'>
                <PreviewProfileItems items={arr} />
            </div>
            <div className='grid grid-cols-2'>
                <div className='avenir-med text-gray-500 text-16px'>Orders</div>
                <ViewMore />
            </div>
            <div className='w-311px h-145px'>
                <PreviewProfileItems items={arrorders} />
            </div>
            <div className='grid grid-cols-2'>
                <div className='avenir-med text-gray-500 text-16px mt-11px'>Sold</div>
                <ViewMore />
            </div>
            <div className='w-311px h-145px mx-auto'>
                <PreviewProfileItems items={arrsold} />
            </div>
        </div>
    );
}


function PreviewProfileItems(props) {

    const items = props.items

    return (
        <div className='w-full h-full grid grid-rows-1 grid-flow-col gap-x-9px overflow-x-auto'>
            {items.map((element) => (
                <ConcisePreview itemid={element.id} img={element.src} text={element.text} key={element.id} />
            ))}
        </div>
    );
}

function ViewMore(props) {
    return (
        <button className='text-blue-400 place-self-end text-10px'>view more</button>
    );
}

export function NewProfilePage({ username }) {
    const {currentUser} = useContext(AuthContext)
    const currentUsername = currentUser ? currentUser.displayName: null;
    const avaliablePages = [InfoPages.watchList, InfoPages.sellingItems, InfoPages.orders, InfoPages.sold, InfoPages.subscriptions]
    const settingPages = [SettingPages.location, SettingPages.profile]

    return (
        <div className="h-max w-310px mr-30px rounded-25px py-40px bg-white flex flex-col items-center">
            <UserProfile username={username ? username : currentUsername} />
            <div className="flex flex-col items-start mt-29px">

                <div className="font-roboto-reg text-18px mb-20px text-gray-600">
                    My Account
                </div>
                <div className="flex flex-col justify-start space-y-5px ">
                    {avaliablePages.map((page) => <SelectTab key={PageNames[page]} name={PageNames[page]} page={page} />)}
                </div>

            </div>
            <div className="flex flex-col items-start mt-50px">
                <div className="font-roboto-reg text-18px mb-20px text-gray-600">
                    Settings
                </div>
                <div className="flex flex-col justify-start space-y-5px ">
                    {settingPages.map((page) => <SelectTab key={PageNames[page]} name={PageNames[page]} page={page} />)}
                </div>
            </div>
        </div>
    );
}

function SelectTab({ name, page }) {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => { navigate("/profile/", { state: { page: page } }) }}
            className={`flex items-center w-260px h-30px px-10px py-7px rounded-6px bg-white text-gray-500 hover:text-gray-400 hover:bg-blue-50 text-14px  leading-none`}
        >
            {name}
        </div>
    );
}