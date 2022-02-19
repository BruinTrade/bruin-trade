import React from "react";
import Home from "../components/tradingItems";
import ProfilePage from "../components/profile";
import TradingItems from "../components/tradingItems";
import Categories from "../components/categories";

export default function PageHome() {
    return (
        <div className="flex flex-row justify-center items-center">
            <div className='mt-63px ml-80px flex flex-col space-y-30px'>
                <div>
                    <div className='pl-25px avenir-med text-gray-500 text-20px mb-10px'>Trading Items</div>
                    <TradingItems />
                </div>
                <Categories />
            </div>

            <div className='w-357px h-817px mt-20px ml-40px mr-80px bg-white pr-25px pl-25px flex flex-row justify-between rounded-25px'>
                <ProfilePage />
            </div>
        </div>
    );
}