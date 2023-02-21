import axios from "axios";

const API_URL = "http://localhost:5000/api/cluster";

const createCluster = async (token, details) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.post(API_URL + "/create/cluster", details, config);
    return response.data;
};

const clusterService = {
    createCluster,
};

export default clusterService;