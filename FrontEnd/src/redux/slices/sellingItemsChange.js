import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sellingItemsChange : false
}

export const sellingItemsChange = createSlice({
    name: 'sellingItemsChange',
    initialState: initialState,
    reducers: {
        setSellingItemsChange: (state, action) => {
            state.sellingItemsChange = !(state.sellingItemsChange)
        },
    }
})

//actions
export const { setSellingItemsChange } = sellingItemsChange.actions;

//reducer
export default sellingItemsChange.reducer;