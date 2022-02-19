import http from "../axios-http"
import { login, logout } from '../redux/slices/loginStatus.js';
import { setLocation, setUsername } from '../redux/slices/userInfo.js';

const UserServices = {
    login : useLogin,

    logout : useLogout,

    register: useRegister,
}

async function useLogin(dispatch, username, password) {

    const data = { username: username, password: password }
    const res = await http.post("/login", data)
    const status = res.status;

    //success
    if(status === 200) {
        try {
            const data = res.data;
            console.log(data.token)
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
        console.log(res);
        return { status: status, error: res.error };
    }
}

async function useLogout(dispatch) {
    //remove token
    try {
        dispatch(logout());
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
        console.log(res);
        return { status: status, error: res.error };
    }
}

export default UserServices;


// checkLogin: () => {
//     return http.get("/login")
// }