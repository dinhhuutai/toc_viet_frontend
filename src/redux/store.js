import { configureStore } from "@reduxjs/toolkit";
import modalBookSlice from "./slices/modalBookSlice";
import noticeAdminSlice from "./slices/noticeAdminSlice";
import authSlice from "./slices/authSlice";
import introduceSlice from "./slices/introduceSlice";


import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, authSlice.reducer);


const store = configureStore({
    reducer: {
        auth: persistedReducer,
        modalBook: modalBookSlice.reducer,
        noticeAdmin: noticeAdminSlice.reducer,
        introduce: introduceSlice.reducer,
    }
})

export const persistor = persistStore(store);


export default store;