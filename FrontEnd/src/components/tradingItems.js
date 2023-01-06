import React, { useEffect, useState } from "react";
import { ItemPreviewList } from "./itemPreview";
import ItemServices from "../backend_services/item_services";
import { query, orderBy, limit, getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";


export default function TradingItems({ autoScroll }) {

    const [results, setResults] = useState([]);

    useEffect(() => {
        (async () => {
            const q = query(collection(db, "products"), limit(3));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setResults(existingResults => {return [...existingResults, doc.data().pid]})
                console.log(doc.id, " => ", doc.data());
            });
        })();
        console.log(results)
        setResults(shuffle(results))
    }, [])

    return (
        results.length ?
            <div className='mt-20px flex flex-row justify-center'>
                <ItemPreviewList type="short" itemIds={results} autoScroll={autoScroll} />
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