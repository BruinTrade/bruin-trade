import { configureStore } from '@reduxjs/toolkit'
import loginStatus from './slices/loginStatus.js';
import userInfo from './slices/userInfo.js';
import loading from './slices/loading.js';

export const store = configureStore({
    reducer: {
        loginStatus: loginStatus,
        userInfo: userInfo,
        loading: loading,
    },
})