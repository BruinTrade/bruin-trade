import { configureStore } from '@reduxjs/toolkit'
import loginInfo from './slices/loginInfo'

export const store = configureStore({
    reducer: {
        loginInfo: loginInfo,
    },
})