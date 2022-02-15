import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'

const initialState = {
    username: Cookies.get('username') === undefined ? null : Cookies.get('username'),
    location: Cookies.get('location') === undefined ? null : Cookies.get('location')
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