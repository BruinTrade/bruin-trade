import React from "react";
import SignUp from "../components/signup.js"
import SignIn from "../components/signin.js"
import ItemDetails from "../components/itemDetails.js";
import ItemPreview from "../components/itemPreview";
import CreatePost from "../components/icons_js/createPost.jsx";

function Home() {
    return (
        <div className="flex flex-col justify-center items-center">
            {/* <div className="text-2xl">Home</div>
            <ItemDetails /> */}
            <CreatePost />
        </div>
    );
}

export default Home;