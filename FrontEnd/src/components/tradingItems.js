import React from "react";
import ItemPreview from "./itemPreview";

export default function TradingItems(props) {

    const arr = [1,2,3,4,5]

    return (
        <div>
            <div className='w-955px h-336px pt-25px pb-23px pl-27px rounded-25px grid grid-rows-1 grid-flow-col gap-x-17px overflow-x-auto'>
                {arr.map(() => (
                    <ItemPreview />
                ))}
            </div>
        </div>
    );
}