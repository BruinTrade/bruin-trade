import React from "react";
import ItemPreview from "./itemPreview";

export default function TradingItems(props) {

    const items = props.items

    return (
        <div>
            <div className='w-955px h-336px pt-25px pb-23px pl-27px rounded-25px grid grid-rows-1 grid-flow-col-dense gap-x-17px overflow-x-auto'>
                {items.map((element) => (
                    <ItemPreview itemid={element.id} img={element.src} text={element.text} price={element.price}/>
                ))}
            </div>
        </div>
    );
}