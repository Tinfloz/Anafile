import axios from "axios";

const API_URL = "http://localhost:5000/api/search";

const searchAppUsers = async (token, query) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.get(API_URL + `?query=${query}`, config);
    return response.data;
};

const searchClusterUsers = async (token, query) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.get(API_URL + `/cluster/user?query=${query}`, config);
    return response.data;
};

const searchService = {
    searchAppUsers,
    searchClusterUsers
};

export default searchService;