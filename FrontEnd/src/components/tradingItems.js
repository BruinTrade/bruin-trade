import React, { useEffect, useState } from "react";
import { ItemPreviewList } from "./itemPreview";
import ItemServices from "../backend_services/item_services";

export default function TradingItems() {

    const [results, setResults] = useState([]);

    useEffect(() => {
        ItemServices.get_all().then(res => {
            const start = getRandomInt(res.data.length-5)
            console.log(start)
            setResults(res.data.slice(start, start+5).map(item => item._id));
        });
        setResults(shuffle(results))
    }, [])

    console.log(shuffle(results))
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


function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }