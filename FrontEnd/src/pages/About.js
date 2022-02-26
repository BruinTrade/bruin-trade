import React from "react";
import ProfileDetails from "../components/profileDetails";

export default function PageAbout() {
    return (
      <div className="flex flex-row justify-center">
        <div className="text-2xl hidden">About</div>
        <ProfileDetails/>
      </div>
    );
}
