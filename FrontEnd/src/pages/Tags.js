
import React, { useEffect, useState } from "react";
import { ItemPreviewList } from "../components/itemPreview";
import ItemServices from "../backend_services/item_services";
import { Routes, Route, useParams } from 'react-router-dom';
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
    //fetch data
    useEffect(() => {
        // let fetchMethod = get_all;
        // if(tags === "get_all_items") {
            
        // }
        if (tags === "get_all_items") {
            ItemServices.get_all().then(res => {
                setResults(res.data.map(item => item._tags))
                setLoading(false)
            })
        }
        else {
            console.log(tags);
            ItemServices.getByQuery("tags", tags).then(res => {
                // setResults(res.data.map(item => item._tags))
                setResults(res.data.filter
                ((item) => {
                   return item.tags === tags
                }).map(item => item._id))
                setLoading(false)
            })
        }
    }, [tags])
    // setResults(results.filter(item => item.Tags === tags));
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

