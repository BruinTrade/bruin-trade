import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    replyTarget : null
}

export const replyTarget = createSlice({
    name: 'replyTarget',
    initialState: initialState,
    reducers: {
        setReplyTarget: (state, action) => {
            //set replyTarget
            state.replyTarget = action.payload;
        },
    }
})

//actions
export const { setReplyTarget } = replyTarget.actions;

//reducer
export default replyTarget.reducer;