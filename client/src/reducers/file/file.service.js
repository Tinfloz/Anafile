import axios from "axios";

const API_URL = "http://localhost:5000/api/file";

// create file
const createAFile = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.post(API_URL + "/upload/file", data, config);
    return response.data;
};

// get all files
const getAllFiles = async (token, clusterId) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.get(API_URL + `/get/my/files?clusterId=${clusterId}`, config);
    return response.data;
};

const fileService = {
    createAFile, getAllFiles
};

export default fileService;