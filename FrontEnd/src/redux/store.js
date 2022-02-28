import { configureStore } from '@reduxjs/toolkit'
import loginStatus from './slices/loginStatus.js';
import userInfo from './slices/userInfo.js';
import loading from './slices/loading.js';
import replyTarget from './slices/replyTarget.js';
import query from './slices/query.js';

export const store = configureStore({
    reducer: {
        loginStatus: loginStatus,
        userInfo: userInfo,
        loading: loading,
        replyTarget: replyTarget,
        query: query,
    },
})