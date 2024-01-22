import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name: 'modalBook',
    initialState: {
        open: false,
    },
    reducers: {
        openModalBook: (state, action) => {
            state.open = true;
        },
        closeModalBook: (state, action) => {
            state.open = false;
        },
    }
})