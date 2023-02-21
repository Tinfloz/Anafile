import axios from "axios";

const API_URL = "http://localhost:5000/api/cluster";

// create a cluster
const createCluster = async (token, details) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.post(API_URL + "/create/cluster", details, config);
    return response.data;
};

// get all user clusters
const getAllClusters = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.get(API_URL + "/my/clusters", config);
    return response.data;
}

const clusterService = {
    createCluster, getAllClusters
};

export default clusterService;