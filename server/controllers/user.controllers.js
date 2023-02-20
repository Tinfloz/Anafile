import Users from "../models/users.model.js";
import { getAccessToken } from "../helpers/get.access.token.js";

// register 
const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            throw "fields missing"
        };
        const userExists = await Users.findOne({
            email
        });
        if (userExists) {
            throw "user already exists"
        };
        const user = await Users.create({
            email, password, name
        });
        const sendUser = {
            email,
            name,
            token: getAccessToken(user._id)
        };
        return res.status(200).json({
            success: true,
            sendUser
        });
    } catch (error) {
        console.log(error)
        if (error === "fields missing" || error === "user already exists") {
            return res.status(400).json({
                success: false,
                error: error.errors?.[0]?.message || error
            });
        };
        return res.status(500).json({
            success: false,
            error: error.errors?.[0]?.message || error
        });
    };
};

// login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({
            email
        });
        if (!user) {
            throw "user not found"
        };
        if (!await user.matchPassword(password)) {
            throw "passwords don't match"
        };
        const sendUser = {
            email: user.email,
            name: user.name,
            token: getAccessToken(user._id)
        };
        return res.status(200).json({
            sendUser
        });
    } catch (error) {
        if (error === "user not found") {
            return res.status(404).json({
                success: false,
                error: error.errors?.[0]?.message || error
            });
        } else if (error === "passwords don't match") {
            return res.status(400).json({
                success: false,
                error: error.errors?.[0]?.message || error
            });
        };
        return res.status(500).josn({
            success: false,
            error: error.errors?.[0]?.message || error
        });
    };
};

export {
    login, register
}