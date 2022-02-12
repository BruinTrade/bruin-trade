import React from "react";
import SignUp from "../components/signup.js"
import SignIn from "../components/signin.js"
import CategoryItem from "../components/categoryItem.js";

import ItemPreview from "../components/itemPreview";

function Home() {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="text-2xl">Home</div>
            <ItemPreview />
            
            <SignUp/>
            <SignIn/>
            <CategoryItem label="Books" />
        </div>
    );
}

export default Home;