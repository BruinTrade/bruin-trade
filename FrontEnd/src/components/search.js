import React from "react";
import LongPreview from "./itemPreviewLong";

export default function SearchMap(props){
    const searchResults = [1,2,3]
return(
    <div className="flex flex-col space-y-20px justify-center items-center">
        {searchResults.map(() => (
            <LongPreview />
        ))}
    </div>
);
}