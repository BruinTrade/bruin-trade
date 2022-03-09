import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartChange : false
}

export const cartChange = createSlice({
    name: 'cartChange',
    initialState: initialState,
    reducers: {
        setCartChange: (state, action) => {
            state.cartChange = !(state.cartChange)
        },
    }
})

//actions
export const { setCartChange } = cartChange.actions;

//reducer
export default cartChange.reducer;