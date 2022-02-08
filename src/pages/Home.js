import React from "react";

import ItemPreview from "../components/itemPreview";

function Home() {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="text-2xl">Home</div>
            <ItemPreview />
        </div>
    );
}

export default Home;