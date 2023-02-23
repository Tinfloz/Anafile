import express from "express";
import { searchClusterUser, searchUser } from "../controllers/search.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

let router = express.Router();

router.route("/").get(protect, searchUser);
router.route("/cluster/user/:clusterId").get(protect, searchClusterUser);

export default router;