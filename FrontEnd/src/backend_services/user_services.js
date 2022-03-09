import http from "../axios-http"
import { login, logout } from '../redux/slices/loginStatus.js';
import { setLocation, setUsername, setEmail, setProfileImage } from '../redux/slices/userInfo.js';

const UserServices = {
    login : useLogin,

    logout : useLogout,

    register: useRegister,

    addItemToCart: addItemToCart,

    removeFromCart: removeFromCart,

    getItemsInCart: getItemsInCart,

    follow: follow,

    unfollow: unfollow,

    getAllFollowings: getAllFollowings,

    getItemsBelongToUser: getItemsBelongToUser,

    updateLocation: updateLocation,

    getLocation: getLocation,

    getLocationByUsername: getLocationByUsername,

    updateUserInfo: updateUserInfo,

    getUserIconByUsername: getUserIconByUsername,

    getVerbolLocationByUsername: getVerbolLocationByUsername,
}

async function useLogin(dispatch, username, password) {

    const data = { username: username, password: password }
    const res = await http.post("/login", data)
    const status = res.status;

    //success
    if(status === 200) {
        try {
            const data = res.data;
            //console.log(data.token)
            //set login status
            dispatch(login(data.token));
            //set user info
            dispatch(setUsername(data.username));
            dispatch(setEmail(data.email));
            dispatch(setLocation(data.location));
            if (data.icon_url)
            {
                dispatch(setProfileImage(data.icon_url));
            }
            else
            {
                dispatch(setProfileImage(null));
            }
            return { status: 200 }
    //process failed
        } catch {
            return { status: 300, error: "error when processing data." }
        }
    //request failed
    } else {
        return { status: status, data: res.data };
    }
}

async function useLogout(dispatch) {
    //remove token
    try {
        dispatch(logout());
        dispatch(setUsername(null));
        dispatch(setLocation(null));
        return { status: 200 };
    } catch {
    //error logginout
        return { status: 300, error: "error logging out." };
    }
}

async function useRegister(dispatch, username, password, email, location) {
    const data = { username: username, password: password, email: email, location: location};
    const res = await http.post("/register", data);

    const status = res.status;

    //success
    if(status === 200) {
        try {
            const data = res.data;
            //set login status
            dispatch(login(data.token));
            //set user info
            dispatch(setUsername(data.username));
            dispatch(setLocation(data.location));
            return { status: 200 }
    //process failed
        } catch {
            return { status: 300, error: "error when processing data." }
        }
    //request failed
    } else {
        //console.log(res);
        return { status: status, data: res.data };
    }
}

async function addItemToCart(token, item_id)
{
    const config = {
        headers: {
            access_control: token,
        }
    }
    const data = {}
    return http.post(`/placeholder/${item_id}/addToCart`, data, config)
}

async function removeFromCart(token, item_id)
{
    const config = {
        headers: {
            access_control: token,
        }
    }
    const data = {}
    return http.post(`/placeholder/${item_id}/removeFromCart`, data, config)
}

async function getItemsInCart(token)
{
    const config = {
        headers: {
            access_control: token,
        }
    }

    return http.get("/placeholder/cart", config)
}

async function getItemsBelongToUser(username)
{
    const res = await http.get(`/items?owner=${username}`)
    if (res.status !== 200)
    {
        return { status: res.status, data: res.data };
    }
    const data = res.data.filter((item) => {
        return item.owner === username
    })
    // console.log("data:")
    // console.log(data)
    return { status: res.status, data: data };
}

async function follow(token, target_user_id)
{
    const config = {
        headers: {
            access_control: token,
        }
    }
    const data = {}
    return http.post(`/follow/${target_user_id}`, data, config)
}

async function unfollow(token, target_user_id)
{
    const config = {
        headers: {
            access_control: token,
        }
    }
    const data = {}
    return http.post(`/unfollow/${target_user_id}`, data, config)
}

async function getAllFollowings(token)
{
    const config = {
        headers: {
            access_control: token,
        }
    }
   
    return http.get("/followings", config)
}

async function updateLocation(token, latitude, longitude)
{
    const config = {
        headers: {
            access_control: token,
        }
    }
    const data = {
        location: {
            latitude: latitude,
		    longitude: longitude
        }
    }
    return http.post("/updateLocation", data, config)
}

async function getLocation(token)
{
    const config = {
        headers: {
            access_control: token,
        }
    }
    return http.get("/getLocation", config)
}

async function getLocationByUsername(token, username)
{
    const config = {
        headers: {
            access_control: token,
        }
    }
    return http.get(`/${username}/getLocationByUsername`, config)
}

async function updateUserInfo(token, email, icon_url, location) {
    const config = {
        headers: {
            access_control: token,
        }
    }
    const data = {
        email: email,
        icon_url: icon_url,
        location: location
    }
    return http.post("/updateUserInfo", data, config)
}

async function getUserIconByUsername(token, username) {
    const config = {
        headers: {
            access_control: token,
        }
    }
    return http.get(`/${username}/getUserIconByUsername`, config)
}

async function getVerbolLocationByUsername(token, username)
{
    const config = {
        headers: {
            access_control: token,
        }
    }
    return http.get(`/${username}/getVerbolLocationByUsername`, config)
}

export default UserServices;


// checkLogin: () => {
//     return http.get("/login")
// }