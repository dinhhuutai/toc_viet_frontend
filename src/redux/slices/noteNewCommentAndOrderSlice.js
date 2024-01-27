import { createSlice } from "@reduxjs/toolkit";


export default createSlice({
    name: 'noteNewCommentAndOrder',
    initialState: {
        commentCollection: 0,
        commentProduct: 0,
        commentService: 0,
        order: 0,
    },
    reducers: {
        setCommentCollection: (state, action) => {
            state.commentCollection = action.payload;
        },
        setCommentProduct: (state, action) => {
            state.commentProduct = action.payload;
        },
        setCommentService: (state, action) => {
            state.commentService = action.payload;
        },
        setOrder: (state, action) => {
            state.order = action.payload;
        },
        setValue: (state, action) => {
            state.commentCollection = action.payload.commentCollectionLength;
            state.commentProduct = action.payload.commentProductLength;
            state.commentService = action.payload.commentServiceLength;
            state.order = action.payload.orderNewLength;
        }
    }
})