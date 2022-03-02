import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'

const initialState = {
    username: Cookies.get('username') === undefined ? null : Cookies.get('username'),
    email: Cookies.get('email') === undefined ? null : Cookies.get('email'),
    location: Cookies.get('location') === undefined ? null : Cookies.get('location'),
    profileImage: Cookies.get('profileImg') === undefined ? "https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg" : Cookies.get('profileImg'),
    rating: Cookies.get("rating") === undefined ? 5 : Cookies.get("rating") 
}

export const userInfo = createSlice({
    name: 'userInfo',
    initialState: initialState,
    reducers: {
        setUsername: (state, action) => {
            //set username
            Cookies.set('username', action.payload, { expires: 7 });
            state.username = action.payload;
        },
        setEmail: (state, action) => {
            //set username
            Cookies.set('email', action.payload, { expires: 7 });
            state.email = action.payload;
        },
        setLocation: (state, action) => {
            //set location
            Cookies.set('location', action.payload, { expires: 7 });
            state.location = action.payload;
        }
    }
})

//actions
export const { setUsername, setLocation, setEmail } = userInfo.actions;

//reducer
export default userInfo.reducer;