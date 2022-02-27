import React, { useEffect, useState } from "react";
import { ItemPreviewList } from "../components/itemPreview";
import { Routes, Route, useParams } from 'react-router-dom';
import ItemServices from "../backend_services/item_services";

export default function Search() {
    return <Routes>
        <Route path=":id" element={<SearchResult />} />
    </Routes>;
}



function SearchResult() {
    let { id } = useParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    //fetch data
    useEffect(() => {
        if (id === "get_all_items") {
            ItemServices.get_all().then(res => {
                setResults(res.data.map(item => item._id))
                setLoading(false)
            })
        }
        else {
            ItemServices.getByQuery("title", id).then(res => {
                setResults(res.data.map(item => item._id))
                setLoading(false)
            })
        }
    }, [id])


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