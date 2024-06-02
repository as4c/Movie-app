import { configureStore } from "@reduxjs/toolkit";

import authReducer from './authSlice';
import favouriteReducer from './favouriteSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        favourite : favouriteReducer,
    },
});
