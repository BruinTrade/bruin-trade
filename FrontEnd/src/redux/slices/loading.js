import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false
}

export const loading = createSlice({
    name: 'loading',
    initialState: initialState,
    reducers: {
        setLoading: (state, action) => {
            //set loading
            state.loading = action.payload;
        },
    }
})

//actions
export const { setLoading } = loading.actions;

//reducer
export default loading.reducer;