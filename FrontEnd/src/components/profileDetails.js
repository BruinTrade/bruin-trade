import React, { useState } from "react";
import UserProfile from "./userProfile";
import Form from "./form";
import ItemPreview from "./itemPreview";
import ConcisePreview from "./itemConcisePreview";
import CategoryItem from "./categoryItem";


export default function ProfileDetails() {
  const [state, setState] = useState(0);
  const [stateTag, setStateTag] = useState("Profile");
  const [username, setUsername] = useState("The_Guy");
  const [email, setEmail] = useState("theguy@gmail.com");

  function saveChanges() {
    // to be implemented
  }

  let menu;
  switch(state) {
    case 1: // Watch List
      menu = (
        <div className="w-1000px h-569px bg-white drop-shadow-md pl-35px pt-25px rounded-25px flex-col flex">
          Work in Progress
        </div>
      );
      break;
    default: // state 0
      menu = (
        <div className="w-1000px h-569px bg-white drop-shadow-md pl-35px pt-25px rounded-25px flex-col flex">
          <div className="h-164px flex-col flex justify-between">
            <Form
              label="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              type="text"
              maxLength={20}
              minLength={3}
            />
            <Form
              label="Email"
              placeholder="Please enter a valid email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
            />
          </div>
          <div className="w-200px h-221px text-14px font-avenir-reg mt-49px">
            Profile Image
            <div className="h-10px" />
            <UserProfile />
          </div>
          <button onClick={saveChanges} className="absolute text-16px font-roboto-reg text-white ml-775px mt-460px bg-blue-300 h-50px w-150px rounded-full hover:bg-blue-400">
            Save Changes
          </button>
        </div>
      );
  }

  return (
    <div className="flex flex-row mt-10px">
      <div className="h-817px w-310px mr-30px rounded-25px pt-40px bg-white drop-shadow-md flex flex-col items-center">
        <UserProfile />
        <div className="flex flex-col items-start mb-38px mt-29px">
          <h className="font-roboto-reg text-18px mb-5px">My Account</h>
          <div className="w-230px h-100px flex-col flex items-start pl-12px justify-between">
            <button onClick={() => setState(1)}className="font-avenir-reg text-14px hover:font-avenir-med">
              Watch List
            </button>
            <button className="font-avenir-reg text-14px hover:font-avenir-med">
              Orders
            </button>
            <button className="font-avenir-reg text-14px hover:font-avenir-med">
              Sold
            </button>
            <button className="font-avenir-reg text-14px hover:font-avenir-med">
              Subscriptions
            </button>
          </div>
        </div>
        <div className="flex flex-col items-start mt-29px">
          <h className="font-roboto-reg text-18px mb-5px">Settings</h>
          <div className="w-230px h-50px flex-col flex items-start pl-12px justify-between">
            <button className="font-avenir-reg text-14px hover:font-avenir-med">
              Location
            </button>
            <button onClick={() => setState(0)} className="font-avenir-reg text-14px hover:font-avenir-med">
              Profile
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10px">
        <h className="font-roboto-reg text-16px ml-20px">{stateTag}</h>
        <div className="h-5px"/>
        {menu}
      </div>
    </div>
  );
}
