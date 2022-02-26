import React from "react";
import { ItemPreviewList } from "../components/itemPreview";
import { Routes, Route, useParams } from 'react-router-dom';


export default function Search(){
    return <Routes>
            <Route path=":id" element={<SearchResult />}/>
        </Routes>;
}


function SearchResult() {
    let { id } = useParams();
    //fetch data
    const searchResult = [1];
    
    console.log(id)
    return(
        <div className='mt-50px flex flex-row justify-center'>
            <ItemPreviewList itemIds={searchResult}/>
        </div>
    ); 
}