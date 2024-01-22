import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name: 'introduce',
    initialState: {
        introduce: {},
    },
    reducers: {
        getData: (state, action) => {
            state.introduce = action.payload;
        },
    }
})