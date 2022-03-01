import React, { useState, useEffect } from "react";
import UserProfile from "./userProfile";
import Form from "./form";
import { ItemPreviewList } from "./itemPreview";
import UserServices from "../backend_services/user_services";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
//import commentServices from '../backend_services/comment_services';

// TO-DO:
// - finish subscriptions and implement subscriptions page function
// - implement everything else (watch list, orders, sold, location)

export default function ProfileDetails() {
  const original_username = useSelector((state) => state.userInfo.username);
  const token = useSelector((state) => state.loginStatus.token);
  const sellingItemsChange = useSelector((state) => state.sellingItemsChange.sellingItemsChange);
  const alert = useAlert();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [state, setState] = useState(0);
  const [stateTag, setStateTag] = useState("Profile");
  const [email, setEmail] = useState("theguy@gmail.com");
  const [subPageNum, setSubPageNum] = useState(1);
  const [username, setUsername] = useState(original_username);
  const [watchlistItemIDs, setWatchlistItemIDs] = useState([]);
  const [myItemIds, setMyItemIds] = useState([]);
  //const watchlist = [1, 2, 3, 4, 5];

  useEffect(() => {
    async function fetchData() {
      UserServices.getItemsInCart(token).then(async (res) => {
        if (res.status !== 200) {
          alert.show(res.data.errors ? res.data.errors : res.data.error);
          navigate("/");
        }
        const data = res.data;
        //console.log("data", data)
        setWatchlistItemIDs(data.cart.map((item) => item._id));
      });

      const res2 = await UserServices.getItemsBelongToUser(original_username);
      if (res2.status !== 200) {
        alert.show(res2.data.errors ? res2.data.errors : res2.data.error);
        navigate("/");
      }
      setMyItemIds(res2.data.map((item) => item._id));
      setLoading(false);
    }

    fetchData();
  }, [sellingItemsChange]);

  function saveChanges() {
    // to be implemented
  }

  function unsubscribe() {
    // to be implemented
  }

  function Sub() {
    return (
      <div className="w-1000px h-91px pl-31px pr-22px flex bg-white rounded-25px flex-row justify-between items-center overflow-hidden drop-shadow-md">
        <div className="pt-20px flex flex-row text-gray-400 text-12px font-avenir-reg items-center">
          <UserProfile />
          <div className="w-8px" />
          The_Guy {/* to be implemented */}
        </div>
        <button
          onClick={() => unsubscribe()}
          className="font-roboto-reg text-10px bg-gray-200 text-gray-500 rounded-6px h-24px w-75px hover:bg-gray-300"
        >
          Unsubscribe
        </button>
      </div>
    );
  }
  //console.log("watchlistItemIDs", watchlistItemIDs)

  // console.log("myItemIds:");
  // console.log(myItemIds);
  // console.log("watchlistItemIDs:");
  // console.log(watchlistItemIDs);

  let menu;
  switch (state) {
    case 1: // Watch List
      menu =
        watchlistItemIDs.length === 0 ? (
          <div className="flex flex-col justify-between h-100px w-1000px bg-white font-avenir-reg text-20px text-center text-gray-500 drop-shadow-md pl-35px pt-40px rounded-25px">Nothing in watch list yet =.=</div>
        ) 
        : 
        (
          <ItemPreviewList itemIds={watchlistItemIDs} />
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
    case 6: // My Selling Items
      menu =
        myItemIds.length === 0 ? (
          <div className="flex flex-col justify-between h-100px w-1000px bg-white font-avenir-reg text-20px text-center text-gray-500 drop-shadow-md pl-35px pt-40px rounded-25px">You have not listed any items yet =.=</div>
        ) : (
          <ItemPreviewList itemIds={myItemIds} hasDeleteButton={true}/>
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
    <div className="w-full flex flex-row justify-start mt-10px ml-80px">
      <div className="h-817px w-310px mr-30px rounded-25px pt-40px bg-white drop-shadow-md flex flex-col items-center">
        <UserProfile />
        <div className="flex flex-col items-start mb-38px mt-29px">
          <div className="font-roboto-reg text-18px mb-5px text-gray-600">
            My Account
          </div>
          <div className="w-230px h-100px flex-col flex items-start pl-12px justify-between">
            <button
              onClick={() => {
                setState(6);
                setStateTag("My Selling Items");
              }}
              className="text-gray-500 font-avenir-reg text-14px hover:font-avenir-med"
            >
              My Selling Items
            </button>
            <button
              onClick={() => {
                setState(1);
                setStateTag("Watch List");
              }}
              className="text-gray-500 font-avenir-reg text-14px hover:font-avenir-med"
            >
              Watch List
            </button>
            {/*
            <button onClick={() => {setState(2); setStateTag("Orders")}} className="text-gray-500 font-avenir-reg text-14px hover:font-avenir-med">
              Orders
            </button>
            */}
            <button
              onClick={() => {
                setState(3);
                setStateTag("Sold");
              }}
              className="text-gray-500 font-avenir-reg text-14px hover:font-avenir-med"
            >
              Sold
            </button>
            <button
              onClick={() => {
                setState(4);
                setStateTag("Subscriptions");
              }}
              className="text-gray-500 font-avenir-reg text-14px hover:font-avenir-med"
            >
              Subscriptions
            </button>
          </div>
        </div>
        <div className="flex flex-col items-start mt-29px">
          <div className="font-roboto-reg text-18px mb-5px text-gray-600">
            Settings
          </div>
          <div className="w-230px h-50px flex-col flex items-start pl-12px justify-between">
            <button
              onClick={() => {
                setState(5);
                setStateTag("Location");
              }}
              className="text-gray-500 font-avenir-reg text-14px hover:font-avenir-med"
            >
              Location
            </button>
            <button
              onClick={() => {
                setState(0);
                setStateTag("Profile");
              }}
              className="text-gray-500 font-avenir-reg text-14px hover:font-avenir-med"
            >
              Profile
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10px">
        <div className="font-roboto-reg text-16px ml-20px text-gray-500">
          {stateTag}
        </div>
        <div className="h-5px" />
        {menu}
      </div>
    </div>
  );
}

/*
        <div className="flex flex-col space-y-20px">
          {watchlistItemIDs.map((item_id) => (
            <ItemPreview.Long />
          ))}
        </div>
*/
