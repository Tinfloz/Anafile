import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clusterService from "./cluster.service";

const initialState = {
    cluster: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
};

export const createMyCluster = createAsyncThunk("cluster/create", async (details, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await clusterService.createCluster(token, details);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    };
});

const clusterSlice = createSlice({
    name: "cluster",
    initialState,
    reducers: {
        resetCluster: state => initialState,
        resetClusterHelpers: state => ({
            ...initialState,
            cluster: state.cluster
        }),
    },
    extraReducers: builder => {
        builder
            .addCase(createMyCluster.pending, state => {
                state.isLoading = true;
            })
            .addCase(createMyCluster.fulfilled, state => {
                state.isLoading = false;
                state.isSuccess = true
            })
            .addCase(createMyCluster.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
});

export const { resetCluster, resetClusterHelpers } = clusterSlice.actions;
export default clusterSlice.reducer;