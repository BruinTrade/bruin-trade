import React, { useState, useEffect, useContext } from "react";
import UserProfile, { UserProfileSmall } from "./userProfile";
import Form from "./form";
import Map from "./map";
import { ItemPreviewList } from "./itemPreview";
import UserServices from "../backend_services/user_services";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import get_icon, { Icons } from "./icons_SVG";
import uploadImage from "../backend_services/firebase/imageUpload";
import { useDispatch } from "react-redux";
import { setProfileImage, setLocation } from "../redux/slices/userInfo";

import { auth, db, storage } from "../firebase";
import { AuthContext } from '../context/AuthContext'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateEmail, updateProfile } from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore";

//import commentServices from '../backend_services/comment_services';

// TO-DO:
// - finish subscriptions and implement subscriptions page function
// - implement everything else (watch list, orders, sold, location)

export const InfoPages = {
  watchList: 0,
  sellingItems: 1,
  orders: 2,
  sold: 3,
  subscriptions: 4,
  OtherUserLocation: 7,
}
export const SettingPages = {
  location: 5,
  profile: 6
}


export const PageNames = ["Watch List", "Selling Items", "Orders", "Sold", "Subscriptions", "Location", "Profile", "User Location"];

export default function ProfileDetails(props) {

  const preSelect = props.preSelect;
  const { currentUser } = useContext(AuthContext)
  const currentUsername = currentUser ? currentUser.displayName : null
  const userId = props.userId ? props.userId : currentUsername.uid
  const ownerIsCurrentUser = userId === currentUser.uid ? true : false
  const [selection, setSelectionState] = useState(preSelect !== undefined ? preSelect : (ownerIsCurrentUser ? 6 : 1));
  const [username, setUsername] = useState(currentUsername)
  const [photoURL, setPhotoURL] = useState(currentUser.photoURL)
  const [itemList, setItemList] = useState([])

  const avaliablePages = ownerIsCurrentUser ? [InfoPages.watchList, InfoPages.sellingItems, InfoPages.orders, InfoPages.sold, InfoPages.subscriptions] : [InfoPages.sellingItems, InfoPages.sold, InfoPages.OtherUserLocation]
  const settingPages = [SettingPages.location, SettingPages.profile]

  useEffect(() => {
    // If not currentUser, then fetch that user's name and photo
    if (!ownerIsCurrentUser) {
      (async () => {
        await getDoc(doc(db, "users", userId)).then((docSnap) => {
          if (docSnap.data()) {
            console.log(docSnap.data())
            setUsername(docSnap.data().displayName)
            setPhotoURL(docSnap.data().photoURL)
            setItemList(docSnap.data().sellingItems)
          } else {
            console.log("No Such User exists")
          }
        }).catch((err) => {
          console.log(err)
        });
      })();
    } else {
      (async () => {
        await getDoc(doc(db, "users", userId)).then((docSnap) => {
          if (docSnap.data()) {
            setItemList(docSnap.data().sellingItems)
          } else {
            console.log("No Such User exists")
          }
        }).catch((err) => {
          console.log(err)
        });
      })();

    }
  },[])

  function getMenu(selection) {
    switch (selection) {
      case 0: // Watch List
        return <WatchList />
      case 1: //Selling Items
        return <SellingItems username={userId} itemList={itemList} />
      case 2: // Orders
        return <Orders />
      case 3: // Sold
        return <Sold username={userId} />
      case 4: // Subscriptions
        return <Subscriptions />
      case 5: // Location
        return <Location />
      case 6: // Profile
        return <Profile />
      case 7: //other user location
        return <OtherUserLocation other_username={userId} />
      default: // Profile
        return <Profile />
    }
  }


  return (
    <div className="w-full flex flex-row justify-start mt-40px ml-40px">
      <div className="h-max w-310px mr-30px rounded-25px py-40px bg-white drop-shadow-md flex flex-col items-center">
        {console.log(photoURL)}
        <UserProfile username={username} photoURL={photoURL} />
        <div className="flex flex-col items-start mt-29px">

          <div className="font-roboto-reg text-18px mb-20px text-gray-600">
            My Account
          </div>
          <div className="flex flex-col justify-start space-y-5px ">
            {avaliablePages.map((page) => <SelectTab key={PageNames[page]} name={PageNames[page]} selected={selection === page} selectCallBack={() => setSelectionState(page)} />)}
          </div>

        </div>
        {ownerIsCurrentUser ?
          <div className="flex flex-col items-start mt-50px">
            <div className="font-roboto-reg text-18px mb-20px text-gray-600">
              Settings
            </div>
            <div className="flex flex-col justify-start space-y-5px ">
              {settingPages.map((page) => <SelectTab key={PageNames[page]} name={PageNames[page]} selected={selection === page} selectCallBack={() => setSelectionState(page)} />)}
            </div>
          </div>
          :
          <SubscriptionButton username={userId} />
        }
      </div>
      <div className="mt-10px w-1000px">
        <div className="font-roboto-reg text-16px ml-20px text-gray-500">
          {selection >= PageNames.length ? PageNames[PageNames.length - 1] : PageNames[selection]}
        </div>
        <div className="" />
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

  if (loading) {
    return <Loading />
  } else {
    return <ItemPreviewList itemIds={watchlistItemIDs} placeholder="Go shop around your community!" />
  }
}

function Orders() {

  const [orders, setOrders] = useState([]);
  //const [loading, setLoading] = useState(true);

  return <ItemPreviewList itemIds={orders} hasDeleteButton={true} />

}

function SellingItems({ userid, itemList }) {




  const sellingItemsChange = useSelector((state) => state.sellingItemsChange.sellingItemsChange);
  const alert = useAlert();
  const navigate = useNavigate();
  const [myItemIds, setMyItemIds] = useState(itemList);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
  }, [])


  const placeholder = (
    <div className="flex flex-col justify-center items-center space-y-20px cursor-pointer">
      <div className="text-gray-300 text-16px">You've not posted anything yet.</div>
      <div onClick={() => navigate("/create-post")} className="w-200px h-40px flex justify-center items-center bg-blue-400 rounded-12px text-white text-16px">Sell An Item</div>
    </div>
  );

  if (loading) {
    return <Loading />
  } else {
    // {console.log("My item ids", myItemIds)}
    return <ItemPreviewList itemIds={myItemIds} hasDeleteButton={true} placeholder={placeholder} />
  }
}

function Sold() {
  const [sold, setSold] = useState([]);
  //const [loading, setLoading] = useState(true);

  return <ItemPreviewList itemIds={sold} hasDeleteButton={true} />
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
    if (subscribed) {
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
  if (loading)
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

  if (loading) {
    return <Loading />
  } else {
    return (
      <div className="flex flex-col space-y-20px">
        {subscriptions.length === 0 ?
          <div className="w-full h-200px flex flex-row justify-center items-center text-gray-300 text-16px">Subscribe to your friends!</div>
          :
          subscriptions.map((username) => <Subscription key={username} username={username} unsubscribeCallback={fetchFollowing} />)}
      </div>
    );
  }
}

function Subscription({ username, unsubscribeCallback }) {

  const token = useSelector((state) => state.loginStatus.token);

  function unsubscribe() {
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

function OtherUserLocation(props) {
  const token = useSelector((state) => state.loginStatus.token);
  const alert = useAlert()
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [hasLocation, setHasLocation] = useState(true)
  const [locationChangeFlag, setLocationChangeFlag] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    UserServices.getLocationByUsername(token, props.other_username).then((res) => {
      if (res.status !== 200) {
        alert.show(res.data.errors ? res.data.errors : res.data.error);
      } else {
        if (res.data.location === null) {
          setLatitude(0)
          setLongitude(0)
          setHasLocation(false)
        }
        else {
          setLatitude(res.data.location.latitude)
          setLongitude(res.data.location.longitude)
        }
        setLoading(false)
      }
    })
  }, [locationChangeFlag])

  function viewLocation() {
    setLocationChangeFlag(!locationChangeFlag)
  }

  return loading ?
    <div />
    :
    (
      hasLocation ?
        <div className="relative flex flex-col space-y-20px">
          <div className="rounded-12px overflow-hidden">
            <Map latitude={latitude} longitude={longitude} />
          </div>
          <button
            onClick={viewLocation}
            className="absolute right-10px top-40px p-5px bg-white rounded-2px"
          >
            <div className="w-30px h-30px">
              {get_icon(Icons.location)}
            </div>
          </button>
        </div>
        :
        <div className="flex flex-col justify-center items-center space-y-20px">
          <div className="text-gray-500 text-16px">The user has not provided detailed location yet</div>
        </div>

    )
}


function Location() {
  const token = useSelector((state) => state.loginStatus.token);
  const alert = useAlert()
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [locationChangeFlag, setLocationChangeFlag] = useState(false)
  const [loading, setLoading] = useState(true)
  const [fetchingLocation, setFetchingLocation] = useState(false)
  const [permissionDenied, setPermissionDenied] = useState(false)

  useEffect(() => {
    UserServices.getLocation(token).then((res) => {
      if (res.status !== 200) {
        alert.show(res.data.errors ? res.data.errors : res.data.error);
      } else {
        if (res.data.location === null) {
          setLatitude(0)
          setLongitude(0)
        }
        else {
          setLatitude(res.data.location.latitude)
          setLongitude(res.data.location.longitude)
        }
        setLoading(false)
      }
    })
  }, [locationChangeFlag, fetchingLocation, permissionDenied])


  function updateLocation() {
    setFetchingLocation(true)
    try {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          function (location) {
            UserServices.updateLocation(token, location.coords.latitude, location.coords.longitude).then((res) => {
              if (res.status !== 200) {
                alert.show(res.data.errors ? res.data.errors : res.data.error);
              } else {
                alert.show(res.data.status)
                setFetchingLocation(false)
                setPermissionDenied(false)
                setLocationChangeFlag(!locationChangeFlag)
              }
            })
          },
          function (error) {
            if (error.code == error.PERMISSION_DENIED)
              setPermissionDenied(true)
          }
        )
      } else {
        alert.show("Sorry, geolocation is not available")
      }
    }
    catch {
      alert.show("Sorry, geolocation is not available")
      setPermissionDenied(true)
    }
  }

  function viewLocation() {
    setLocationChangeFlag(!locationChangeFlag)
  }

  return (!permissionDenied) ?
    (loading ?
      <div />
      :
      (fetchingLocation ?
        <div className="flex flex-col justify-center items-center space-y-20px">
          <div className="text-gray-500 text-16px">Fetching your current location...</div>
        </div>
        :
        <div className="relative flex flex-col space-y-20px">
          <div className="rounded-12px overflow-hidden">
            <Map latitude={latitude} longitude={longitude} />
          </div>
          <div className="absolute left-10px top-40px flex flex-col justify-end space-y-10px">
            <button
              onClick={updateLocation}
              className="px-12px py-10px text-16px text-gray-700 bg-white rounded-2px hover:bg-gray-100"
            >
              Set Location
            </button>
          </div>
          <button
            onClick={viewLocation}
            className="absolute right-10px top-40px p-5px bg-white rounded-2px"
          >
            <div className="w-30px h-30px">
              {get_icon(Icons.location)}
            </div>
          </button>
        </div>
      )) :
    <div className="flex flex-col justify-center items-center space-y-20px">
      <div className="text-gray-500 text-16px">Sorry, geolocation is not available right now. Please give your permission.</div>
    </div>
}


function Profile() {
  const { currentUser } = useContext(AuthContext)

  const location = false;


  const dispatch = useDispatch()
  const token = useSelector((state) => state.loginStatus.token)
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(currentUser.email);
  const [username, setUsername] = useState(currentUser.displayName);
  const [userLocation, setUserLocation] = useState(location);
  const [profileImgUrl, setProfileImgUrl] = useState(currentUser.photoURL ? currentUser.photoURL : "https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg");
  const [profileImgFile, setProfileImgFile] = useState();
  const alert = useAlert()

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap) {
        console.log("Document data:", docSnap.data().location);
        const data = docSnap.data()
        setUserLocation(data.location)
        setUsername(data.displayName)
        setEmail(data.email)
        console.log(userLocation)
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })();
  }, [])


  async function saveChanges() {

    if (userLocation === "") {
      alert.show("Must Provide a Location")
    }
    if (email === "") {
      alert.show("Must Provide an Email")
    }

    if (email != currentUser.email) {
      updateEmail(currentUser, email).then(() => {
        console.log("Updated Email: ", email)
      }).catch((error) => {
        console.log(error)
      });
    }
    // If profile image has changed, update all in user profile and user on firestore
    if (profileImgFile) {
      // create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${username + date}`);

      await uploadBytesResumable(storageRef, profileImgFile).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            // Update profile
            await updateProfile(currentUser, {
              displayName: username,
              photoURL: downloadURL,
            })
            // Update user on firestore
            await setDoc(doc(db, "users", currentUser.uid), {
              displayName: username,
              email: email,
              photoURL: downloadURL,
              location: userLocation,
            })
          } catch (err) {
            console.log(err)
          }
        })
      })
      // If only username is changed, onpu update username
    } else {
      try {
        await updateProfile(currentUser, {
          displayName: username,
        })
        await setDoc(doc(db, "users", currentUser.uid), {
          displayName: username,
          location: userLocation,
        }, { merge: true })
      } catch (err) {
        console.log(err)
      }
    }
    alert.show("Successfully updated user profile")
  }

  function handleUploadImage(event) {
    const file = [...event.target.files][0]
    setProfileImgFile(file)
    setProfileImgUrl(URL.createObjectURL(file))
  }

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
          disabled={true}
        />
        <Form
          label="Email"
          placeholder="Please enter a valid email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
        />
        <Form
          label="Location"
          placeholder="Please enter a new location"
          value={userLocation}
          onChange={(event) => setUserLocation(event.target.value)}
          type="text"
        />
      </div>
      <div className="w-200px h-221px text-14px font-avenir-reg mt-49px">
        Profile Image
        <div className='relative flex flex-col justify-start items-center w-100px h-100px'>
          <input type="file" onChange={(event) => handleUploadImage(event)} className="absolute block opacity-0 z-20 w-full h-full left-0 top-0" />
          <div id="profileImg" className="z-10 w-full h-full rounded-full overflow-hidden bg-blue-100">
            <img src={profileImgUrl} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <button
        onClick={saveChanges}
        className="absolute text-16px font-roboto-reg text-white ml-775px mt-460px bg-blue-300 h-50px w-150px rounded-full hover:bg-blue-400"
      >
        Save Changes
      </button>
      {
        loading ?
          <div className="absolute left-0 top-0 w-full h-full backdrop-opacity-10 bg-white-10 z-40">
            <Loading />
          </div>
          :
          null
      }
    </div>
  );
}


function Loading() {
  return <div className="w-full h-200px flex flex-row justify-center items-center text-gray-300 text-16px">Loading...</div>
}

