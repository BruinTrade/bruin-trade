import React from "react";
import SignUp from "../components/signup.js"
import SignIn from "../components/signin.js"

function Home() {
    return (
        <div className="flex flex-row justify-center">
            <div className="text-2xl">Home</div>
            <SignUp/>
            <SignIn/>
        </div>
    );
}

export default Home;