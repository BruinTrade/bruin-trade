import React, { useEffect, useState } from "react";
import { ItemPreviewList } from "./itemPreview";
import ItemServices from "../backend_services/item_services";

export default function TradingItems() {

    const [results, setResults] = useState([]);

    useEffect(() => {
        ItemServices.get_all().then(res => {
            setResults(res.data.slice(0, 9).map(item => item._id))
        })
    }, [])

    return (
        results.length ? 
        <div className='mt-20px flex flex-row justify-center'>
            <ItemPreviewList type="short" itemIds={results} />
        </div>
        :
        <div className='mt-20px flex flex-row justify-center font-avenir-med text-300px text-gray-500'>
            No items found, try another keyword =...=
        </div>

    );
}

{/* <div>
<div className='w-955px h-336px pt-25px pb-23px pl-27px rounded-25px grid grid-rows-1 grid-flow-col-dense gap-x-17px overflow-x-auto'>
    {items.map((element) => (
        <ItemPreview.Short itemid={element.id} img={element.src} text={element.text} price={element.price}/>
    ))}
</div>
</div> */}