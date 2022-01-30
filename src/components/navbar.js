import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
    <div className="flex flex-row justify-center space-x-20">
        <div>Navigation Bar:</div>
        <Link to="/" className="text-blue-400">Home</Link>
        <Link to="/post" className="text-blue-400">Post</Link>
        <Link to="/about" className="text-blue-400">About</Link>
    </div>
    );
}

export default NavBar;