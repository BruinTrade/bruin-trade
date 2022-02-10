import React from "react";
import SignUp from "../components/signup.js"

function Home() {
    return (
        <div className="flex flex-row justify-center">
            <div className="text-2xl">Home</div>
            <SignUp/>
        </div>
    );
}

export default Home;