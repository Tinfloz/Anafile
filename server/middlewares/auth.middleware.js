import jwt from "jsonwebtoken";
import Users from "../models/users.model.js";

export const protect = async (req, res, next) => {
    let token;
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await Users.findById(decoded.id);
            if (!req.user) {
                throw "user not found"
            };
            return next()
        };
        throw "no headers"
    } catch (error) {
        if (error === "user not found") {
            res.status(404).json({
                success: false,
                error: error.errors?.[0]?.message || error
            })
        } else {
            res.status(500).json({
                success: false,
                error: error.errors?.[0]?.message || error
            });
        };
    };
};