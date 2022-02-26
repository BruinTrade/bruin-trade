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
    //fetch data

    useEffect(() => {
        ItemServices.getByQuery("title", id).then(res => {
            setResults(res.data.map(item => item._id))
        })
    }, [])

    return (
        <div className='mt-50px flex flex-row justify-center'>
            <ItemPreviewList itemIds={results} />
        </div>
    )
}