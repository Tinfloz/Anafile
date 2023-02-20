import axios from "axios";

const API_URL = "http://localhost:5000/api/user"

const register = async (creds) => {
    const response = await axios.post(API_URL + "/register", creds);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data.sendUser));
    };
    return response.data.sendUser;
};

const login = async (creds) => {
    const response = await axios.post(API_URL + "/login", creds);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data.sendUser));
    };
    return response.data.sendUser;
}

const authService = {
    register, login
};

export default authService;