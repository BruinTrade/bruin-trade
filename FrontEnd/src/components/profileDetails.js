import React, { useState, useEffect } from "react";
import UserProfile, { UserProfileSmall } from "./userProfile";
import Form from "./form";
import Map from "./map";
import { ItemPreviewList } from "./itemPreview";
import UserServices from "../backend_services/user_services";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";


//import commentServices from '../backend_services/comment_services';

// TO-DO:
// - finish subscriptions and implement subscriptions page function
// - implement everything else (watch list, orders, sold, location)


export default function ProfileDetails({ preSelect, username }) {

  const InfoPages = {
    watchList : 0,
    sellingItems : 1,
    orders : 2,
    sold : 3,
    subscriptions : 4,
  }
  const SettingPages = {
    location : 5,
    profile : 6
  }
  const PageNames = ["Watch List", "Selling Items", "Orders", "Sold", "Subscriptions", "Location", "Profile"]

  const currentUsername = useSelector((state) => state.userInfo.username);
  const user_name = username ? username : currentUsername
  const ownerIsCurrentUser = (user_name === currentUsername)
  const [selection, setSelectionState] = useState(preSelect ? preSelect : (ownerIsCurrentUser ? 6 : 1));

  const avaliablePages = ownerIsCurrentUser ? [InfoPages.watchList, InfoPages.sellingItems, InfoPages.orders, InfoPages.sold, InfoPages.subscriptions] : [InfoPages.sellingItems, InfoPages.sold]
  const settingPages = [SettingPages.location, SettingPages.profile]

  useEffect(() => {
    setSelectionState(selection)
  })

  function getMenu(selection) {
    switch (selection) {
      case 0: // Watch List
        return <WatchList />
      case 1: //Selling Items
        return <SellingItems username={ user_name } />
      case 2: // Orders
        return <Orders />
      case 3: // Sold
        return <Sold username={ user_name } />
      case 4: // Subscriptions
        return <Subscriptions />
      case 5: // Location
        return <Location />
      case 6: // Profile
        return <Profile />
      default: // Profile
        return <Profile />
    }
  }


  return (
    <div className="w-full flex flex-row justify-start mt-40px ml-40px">
      <div className="h-max w-310px mr-30px rounded-25px py-40px bg-white drop-shadow-md flex flex-col items-center">
        <UserProfile username={username ? username : currentUsername} />
        <div className="flex flex-col items-start mt-29px">
          
          <div className="font-roboto-reg text-18px mb-20px text-gray-600">
            My Account
          </div>
          <div className="flex flex-col justify-start space-y-5px ">
            {avaliablePages.map((page) => <SelectTab name={PageNames[page]} selected={selection === page} selectCallBack={() => setSelectionState(page)}/>)}
          </div>
          
        </div>
        {ownerIsCurrentUser ? 
          <div className="flex flex-col items-start mt-50px">
            <div className="font-roboto-reg text-18px mb-20px text-gray-600">
              Settings
            </div>
            <div className="flex flex-col justify-start space-y-5px ">
              {settingPages.map((page) => <SelectTab name={PageNames[page]} selected={selection === page} selectCallBack={() => setSelectionState(page)}/>)}
            </div>
          </div> 
          : 
          <SubscriptionButton username={user_name} />
        }
      </div>
      <div className="mt-10px w-1000px">
        <div className="font-roboto-reg text-16px ml-20px text-gray-500">
          {PageNames[selection]}
        </div>
        <div className="h-5px" />
        {getMenu(selection)}
      </div>
    </div>
  );
}


function SelectTab({ name, selected, selectCallBack }) {
  return (
    <div onClick={() => selectCallBack()} className={`flex items-center w-260px h-30px px-10px py-7px rounded-6px ${selected ? "bg-blue-50 text-blue-500" : "bg-white text-gray-500 hover:text-gray-400 hover:bg-blue-50 "} text-14px  leading-none`}>
      {name}
    </div>
  );
}

function WatchList() {

  const token = useSelector((state) => state.loginStatus.token);

  const alert = useAlert();

  const [watchlistItemIDs, setWatchlistItemIDs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    UserServices.getItemsInCart(token).then((res) => {
      if (res.status !== 200) {
        alert.show(res.data.errors ? res.data.errors : res.data.error);
      } else {
        setWatchlistItemIDs(res.data.cart.map((item) => item._id));
      }
      setLoading(false)
    });
  }, [])

  if(loading) {
    return <Loading />
  } else if(watchlistItemIDs.length === 0) {
    return <div className="flex flex-col justify-between h-100px w-1000px bg-white font-avenir-reg text-20px text-center text-gray-500 drop-shadow-md pl-35px pt-40px rounded-25px">Nothing in watch list yet =.=</div>
  } else {
    return <ItemPreviewList itemIds={watchlistItemIDs} />
  }
}

function Orders() {
  return <div/>
}

function SellingItems({ username }) {

  const alert = useAlert();
  
  const [myItemIds, setMyItemIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    UserServices.getItemsBelongToUser(username).then((res) => {
      if (res.status !== 200) {
        alert.show(res.data.errors ? res.data.errors : res.data.error);
      } else {
        setMyItemIds(res.data.map((item) => item._id));
      }
      setLoading(false)
    })
  }, [])

  if(loading) {
    return <Loading />
  } else if(myItemIds.length === 0) {
    return <div className="flex flex-col justify-between h-100px w-1000px bg-white font-avenir-reg text-20px text-center text-gray-500 drop-shadow-md pl-35px pt-40px rounded-25px">You have not listed any items yet =.=</div>
  } else {
    return <ItemPreviewList itemIds={myItemIds} hasDeleteButton={true}/>
  }

}

function Sold() {
  return <div/>
}

function SubscriptionButton({ username }) {
  
  const token = useSelector((state) => state.loginStatus.token);
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    UserServices.getAllFollowings(token).then((res) => {
      if (res.status !== 200) {
        alert.show(res.data.errors ? res.data.errors : res.data.error);
      } else {
        setSubscribed(res.data.users_followed.includes(username))
        setLoading(false)
      }
    })
  }, [])

  function handleOnClick(username) {
    if(subscribed) {
      UserServices.unfollow(token, username).then((res) => {
        if (res.status !== 200) {
          alert.show(res.data.errors ? res.data.errors : res.data.error);
        } else {
          setSubscribed(false)
        }
      })
    } else {
      UserServices.follow(token, username).then((res) => {
        if (res.status !== 200) {
          alert.show(res.data.errors ? res.data.errors : res.data.error);
        } else {
          setSubscribed(true)
        }
      })
    }
  }
  if(loading) 
    return <div />
  else {
    return (
      <div onClick={() => handleOnClick(username)} className={`flex justify-center items-center h-40px w-200px ${subscribed ? "bg-gray-300" : "bg-blue-400"} rounded-12px text-white text-16px mt-200px`}>
        {subscribed ? "Unsubscribe" : "Subscribe"}
      </div>
    )
  }
}

function Subscriptions() {

  const token = useSelector((state) => state.loginStatus.token);

  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  function fetchFollowing() {
    UserServices.getAllFollowings(token).then((res) => {
      //console.log(res)
      if (res.status !== 200) {
        alert.show(res.data.errors ? res.data.errors : res.data.error);
      } else {
        setSubscriptions(res.data.users_followed);
      }
      setLoading(false);
    })
  }

  useEffect(() => {
    fetchFollowing()
  }, [])

  if(loading) {
    return <Loading />
  } else {
    return (
      <div className="flex flex-col space-y-20px">
        {subscriptions.map((username) => <Subscription username={username} unsubscribeCallback={fetchFollowing}/>)}
      </div>
      );
  }
}

function Subscription({ username, unsubscribeCallback }) {

  const token = useSelector((state) => state.loginStatus.token);

  function unsubscribe () {
    UserServices.unfollow(token, username).then((res) => {
      if (res.status !== 200) {
        alert.show(res.data.errors ? res.data.errors : res.data.error);
      } else {
        unsubscribeCallback()
      }
    })
  }

  return (
    <div className="w-1000px h-80px pl-31px pr-22px flex bg-white rounded-25px flex-row justify-between items-center ">
       <UserProfileSmall username={username} />
      <button
        onClick={() => unsubscribe()}
        className="font-roboto-reg text-10px bg-gray-200 text-gray-500 rounded-6px h-24px w-75px hover:bg-gray-300"
      >
        Unsubscribe
      </button>
    </div>
  );
}



function Location() {
  const token = useSelector((state) => state.loginStatus.token);
  const alert = useAlert()
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [locationChangeFlag, setLocationChangeFlag] = useState(false)

  useEffect(() => {
    UserServices.getLocation(token).then((res) => {
      if (res.status !== 200) {
        alert.show(res.data.errors ? res.data.errors : res.data.error);
      } else {
        if (res.data.location === null)
        {
          setLatitude(0)
          setLongitude(0)
        }
        else
        {
          setLatitude(res.data.location.latitude)
          setLongitude(res.data.location.longitude)
        }
      }
    })
  }, [locationChangeFlag])


  function updateLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function(location) {
          UserServices.updateLocation(token, location.coords.latitude, location.coords.longitude).then((res) => {
            if (res.status !== 200) {
              alert.show(res.data.errors ? res.data.errors : res.data.error);
            } else {
              alert.show(res.data.status)
              setLocationChangeFlag(!locationChangeFlag)
            }
          })
        },
        function(errors) {
          alert.show(errors)
        }
      )
    } else {
      alert.show("Sorry, geolocation is not available")
    }
  }

  function viewLocation() {
    setLocationChangeFlag(!locationChangeFlag)
  }
  
  return <div>
    <div className="flex flex-col h-200px w-1000px bg-white font-avenir-reg text-20px text-center text-gray-500 drop-shadow-md rounded-25px">
    <button
        onClick={updateLocation}
        className="mt-40px ml-350px text-16px font-roboto-reg text-white bg-blue-400 h-50px w-300px rounded-full hover:bg-blue-400"
      >
        Use Current Location In Profile
      </button>
      <button
        onClick={viewLocation}
        className="mt-25px ml-350px text-16px font-roboto-reg text-white bg-blue-300 h-50px w-300px rounded-full hover:bg-blue-400"
      >
        View Location In Profile
      </button>
    </div>
    <div className="mt-10px">
      <Map latitude={latitude} longitude={longitude}/>
    </div>
  </div>
}

function Profile() {

  function saveChanges() {
    // to be implemented
  }

  const [email, setEmail] = useState(useSelector((state) => state.userInfo.email));
  const [username, setUsername] = useState(useSelector((state) => state.userInfo.username));

  return (
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

function Loading() {
 return <div className="w-full h-200px flex flex-row justify-center items-center text-gray-300 text-16px">Loading...</div> 
}

/*


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
*/