import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'

const initialState = {
    login: Cookies.get('token') !== undefined,
    token: Cookies.get('token') ?? null
}

export const loginStatus = createSlice({
    name: 'loginStatus',
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            //set a token cookie that expires in 7 days
            Cookies.set('token', "bearer "+action.payload, { expires: 7 });
            //set token to token payload
            state.token = "bearer "+action.payload;
            //set login to true
            state.login = true;
        },
        logout: (state) => {
            //remove the token cookie
            Cookies.remove('token');
            state.login = false;
            state.token = null;
            state.replyTarget = null;
        }
    }
})

//actions
export const { login, logout } = loginStatus.actions;

//reducer
export default loginStatus.reducer;