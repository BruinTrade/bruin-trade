import React from "react";
import SignUp from "../components/signup.js"
import SignIn from "../components/signin.js"

import ItemPreview from "../components/itemPreview";

function Home() {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="text-2xl">Home</div>
            <ItemPreview />
            <SignUp/>
            <SignIn/>
feature/UI_SignUp_SignIn
        </div>
    );
}

export default Home;