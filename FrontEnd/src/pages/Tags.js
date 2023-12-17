
import React, { useEffect, useState } from "react";
import { ItemPreviewList } from "../components/itemPreview";
// import ItemServices from "../backend_services/item_services";
import { Routes, Route, useParams } from 'react-router-dom';

import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
//import { useSelector } from 'react-redux'

export default function Tags() {
    return <Routes>
        <Route path=":tags" element={<TagResult />} />
    </Routes>;
}

//!!!
//subtle bug: if input "//////" as query... it's treated as part of the url and ignored

function TagResult() {
    let { tags } = useParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get real-time info of products of specific tag
        const q = query(collection(db, "products"), where("categoryTag", "==", tags));
        const getTags = () => {
            const unsub = onSnapshot(q, (querySnapshot) => {
                const products = [];
                querySnapshot.forEach((doc) => {
                    products.push(doc.data().pid)
                });
                console.log("Current products of ", tags, ": ", products.join(", "));
                setResults(products)
            });

            return () => {
                unsub();
            };
        };

        getTags();
        setLoading(false);

    }, [tags])
    
    return (

        loading ? <div className='mt-50px flex flex-row justify-center font-avenir-med text-300px text-gray-500'>
            loading... +_+
        </div>
            :
            (
                results.length ?
                    <div className='mt-50px flex flex-row justify-center'>
                        <ItemPreviewList itemIds={results} />
                    </div>
                    :
                    <div className='mt-50px flex flex-row justify-center font-avenir-med text-300px text-gray-500'>
                        No items found, try another keyword =...=
                    </div>
            )
    )
}

