import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'

const defaultProfileImage = "https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg"

const initialState = {
    username: Cookies.get('username') === undefined ? null : Cookies.get('username'),
    email: Cookies.get('email') === undefined ? null : Cookies.get('email'),
    location: Cookies.get('location') === undefined ? null : Cookies.get('location'),
    profileImage: Cookies.get('profileImg') === undefined ? defaultProfileImage : Cookies.get('profileImg'),
    rating: Cookies.get("rating") === undefined ? 5 : Cookies.get("rating") 
}

export const userInfo = createSlice({
    name: 'userInfo',
    initialState: initialState,
    reducers: {
        setUsername: (state, action) => {
            //set username
            Cookies.set('username', action.payload, { expires: 1 });
            state.username = action.payload;
        },
        setEmail: (state, action) => {
            //set username
            Cookies.set('email', action.payload, { expires: 1 });
            state.email = action.payload;
        },
        setLocation: (state, action) => {
            //set location
            Cookies.set('location', action.payload, { expires: 1 });
            state.location = action.payload;
        },
        setProfileImage: (state, action) => {
            //set profile
            if(!action.payload) {
                state.profileImage = defaultProfileImage;
            } else {
                Cookies.set('profileImg', action.payload, { expires: 1 });
                state.profileImage = action.payload;
            }
        }
    }
})

//actions
export const { setUsername, setLocation, setEmail, setProfileImage } = userInfo.actions;

//reducer
export default userInfo.reducer;