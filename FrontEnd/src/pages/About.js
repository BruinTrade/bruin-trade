import React from "react";
import ProfileDetails from "../components/profileDetails";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PageAbout() {

  return (
    <div className="flex flex-row justify-center">
      <div className="text-2xl hidden">About</div>
      <ProfileDetails />
    </div>
  );
}
