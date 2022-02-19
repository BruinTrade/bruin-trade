import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'

const initialState = {
    username: Cookies.get('username') === undefined ? null : Cookies.get('username'),
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
            Cookies.set('username', action.payload);
            state.username = action.payload;
        },
        setLocation: (state, action) => {
            //set location
            Cookies.set('location', action.payload);
            state.location = action.payload;
        }
    }
})

//actions
export const { setUsername, setLocation } = userInfo.actions;

//reducer
export default userInfo.reducer;