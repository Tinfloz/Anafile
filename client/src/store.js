import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth/auth.slice";
import searchReducer from "./reducers/search/search.slice";
import clusterReducer from "./reducers/cluster/cluster.slice";
import fileReducer from "./reducers/file/file.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        search: searchReducer,
        cluster: clusterReducer,
        file: fileReducer,
    }
});