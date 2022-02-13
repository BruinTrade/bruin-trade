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
            <CategoryItem label="Books" imgUrl="https://media.wired.com/photos/5be4cd03db23f3775e466767/master/w_120" />
        </div>
    );
}

export default Home;