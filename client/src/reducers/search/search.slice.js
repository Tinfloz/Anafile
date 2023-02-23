import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import searchService from "./search.service";

const initialState = {
    members: null,
};

// search app users
export const searchAnafileUsers = createAsyncThunk("ana/users", async (query, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await searchService.searchAppUsers(token, query);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    };
});

// search cluster users
export const searchUserCluster = createAsyncThunk("cluster/users", async (queryDetails, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        const { id, query } = queryDetails;
        return await searchService.searchClusterUsers(token, query, id);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    };
});

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        resetSearch: state => initialState,
        resetSearchHelpers: state => ({
            ...initialState,
            members: state.members
        })
    },
    extraReducers: builder => {
        builder
            .addCase(searchAnafileUsers.fulfilled, (state, action) => {
                state.members = action.payload.users
            })
            .addCase(searchUserCluster.fulfilled, (state, action) => {
                state.members = action.payload.members;
            });
    }
});

export const { resetSearch, resetSearchHelpers } = searchSlice.actions;
export default searchSlice.reducer;