import axios from "axios";

const API_URL = "http://localhost:5000/api/file";

const createAFile = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.post(API_URL + "/upload/file", data, config);
    return response.data;
};

const fileService = {
    createAFile
};

export default fileService;