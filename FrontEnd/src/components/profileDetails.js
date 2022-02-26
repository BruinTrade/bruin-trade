import React, { useState } from "react";
import UserProfile from "./userProfile";
import Form from "./form";
import LongPreview from "./itemPreviewLong";

// TO-DO: 
// - finish subscriptions and implement subscriptions page function
// - implement everything else (watch list, orders, sold, location)


export default function ProfileDetails() {
  const [state, setState] = useState(0);
  const [stateTag, setStateTag] = useState("Profile");
  const [username, setUsername] = useState("The_Guy");
  const [email, setEmail] = useState("theguy@gmail.com");
  const [subPageNum, setSubPageNum] = useState(1);
  const watchlist = [1,2,3,4,5]

  function saveChanges() {
    // to be implemented
  }

  function unsubscribe() {
    // to be implemented
  }

  function Sub() {
    return (
      <div className="w-1000px h-91px pl-31px pr-22px flex bg-white rounded-25px flex-row flex justify-between items-center overflow-hidden drop-shadow-md">
        <div className="pt-20px flex flex-row text-gray-400 text-12px font-avenir-reg items-center">
          <UserProfile />
          <div className="w-8px"/>
          The_Guy {/* to be implemented */}
        </div>
        <button onClick={() => unsubscribe()} className="font-roboto-reg text-10px bg-gray-200 text-gray-500 rounded-6px h-24px w-75px hover:bg-gray-300">Unsubscribe</button>
      </div>
    );
  }

  let menu;
  switch (state) {
    case 1: // Watch List
      menu = (
        <div className="flex flex-col space-y-20px">
          {watchlist.map(() => (
            <LongPreview />
          ))}
        </div>
      );
      break;
    case 2: // Orders
      menu = (
        <div className="w-1000px h-569px bg-white drop-shadow-md pl-35px pt-25px rounded-25px flex-col flex">
          work in progress...
        </div>
      );
      break;
    case 3: // Sold
      menu = (
        <div className="w-1000px h-569px bg-white drop-shadow-md pl-35px pt-25px rounded-25px flex-col flex">
          work in progress...
        </div>
      );
      break;
    case 4: // Subscriptions
      menu = (
        <div className="w-1000px h-569px pl-35px pt-25px flex-col flex justify-between">
          <Sub />
          <Sub />
          <Sub />
          <Sub />
          <div className="flex-row flex justify-center justify-between font-avenir-reg text-32px ml-400px mr-400px">
            <button className="rounded-full text-center bg-white hover:bg-gray-100 drop-shadow-md w-50px">
              &#60;
            </button>
            {subPageNum}
            <button className="rounded-full text-center bg-white hover:bg-gray-100 drop-shadow-md w-50px">
              &#62;
            </button>
          </div>
        </div>
      );
      break;
    case 5: // Location
      menu = (
        <div className="w-1000px h-569px bg-white drop-shadow-md pl-35px pt-25px rounded-25px flex-col flex">
          I was thinking maybe merge Location into Profile?
        </div>
      );
      break;
    default:
      // Profile
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
          <button
            onClick={saveChanges}
            className="absolute text-16px font-roboto-reg text-white ml-775px mt-460px bg-blue-300 h-50px w-150px rounded-full hover:bg-blue-400"
          >
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
          <h className="font-roboto-reg text-18px mb-5px text-gray-600">My Account</h>
          <div className="w-230px h-100px flex-col flex items-start pl-12px justify-between">
            <button onClick={() => {setState(1); setStateTag("Watch List")}} className="text-gray-500 font-avenir-reg text-14px hover:font-avenir-med">
              Watch List
            </button>
            <button onClick={() => {setState(2); setStateTag("Orders")}} className="text-gray-500 font-avenir-reg text-14px hover:font-avenir-med">
              Orders
            </button>
            <button onClick={() => {setState(3); setStateTag("Sold")}} className="text-gray-500 font-avenir-reg text-14px hover:font-avenir-med">
              Sold
            </button>
            <button onClick={() => {setState(4); setStateTag("Subscriptions")}} className="text-gray-500 font-avenir-reg text-14px hover:font-avenir-med">
              Subscriptions
            </button>
          </div>
        </div>
        <div className="flex flex-col items-start mt-29px">
          <h className="font-roboto-reg text-18px mb-5px text-gray-600">Settings</h>
          <div className="w-230px h-50px flex-col flex items-start pl-12px justify-between">
            <button onClick={() => {setState(5); setStateTag("Location")}} className="text-gray-500 font-avenir-reg text-14px hover:font-avenir-med">
              Location
            </button>
            <button onClick={() => {setState(0); setStateTag("Profile")}} className="text-gray-500 font-avenir-reg text-14px hover:font-avenir-med">
              Profile
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10px">
        <h className="font-roboto-reg text-16px ml-20px text-gray-500">{stateTag}</h>
        <div className="h-5px"/>
        {menu}
      </div>
    </div>
  );
}
