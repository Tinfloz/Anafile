import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth/auth.slice";
import searchReducer from "./reducers/search/search.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        search: searchReducer,
    }
});