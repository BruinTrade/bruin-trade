import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    query : ""
}

export const query = createSlice({
    name: 'query',
    initialState: initialState,
    reducers: {
        setQuery: (state, action) => {
            //set replyTarget
            state.query = action.payload;
        },
    }
})

//actions
export const { setQuery } = query.actions;

//reducer
export default query.reducer;