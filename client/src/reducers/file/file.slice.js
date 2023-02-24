import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fileService from "./file.service";

const initialState = {
    file: null,
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: ""
};

// upload a file 
export const uploadAFileToCluster = createAsyncThunk("upload/file", async (formData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await fileService.createAFile(formData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    };
});

// get my files
export const getAllLoginUserClusterFiles = createAsyncThunk("my/files", async (clusterId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await fileService.getAllFiles(token, clusterId);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    };
});

const fileSlice = createSlice({
    name: "file",
    initialState,
    reducers: {
        resetFile: state => initialState,
        resetFileHelpers: state => ({
            ...initialState,
            file: state.file
        })
    },
    extraReducers: builder => {
        builder
            .addCase(uploadAFileToCluster.pending, state => {
                state.isLoading = true;
            })
            .addCase(uploadAFileToCluster.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                if (!action.payload.success) {
                    state.file = action.payload.invalid
                };
            })
            .addCase(uploadAFileToCluster.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAllLoginUserClusterFiles.pending, state => {
                state.isLoading = true;
            })
            .addCase(getAllLoginUserClusterFiles.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.file = action.payload.files;
            })
            .addCase(getAllLoginUserClusterFiles.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
});

export const { resetFile, resetFileHelpers } = fileSlice.actions;
export default fileSlice.reducer;