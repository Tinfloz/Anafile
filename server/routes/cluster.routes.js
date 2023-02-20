import express from "express";
import { accessCluster, createCluster, myClusters } from "../controllers/cluster.controllers.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/create/cluster").post(protect, createCluster);
router.route("/my/clusters").get(protect, myClusters);
router.route("/access/cluster").post(protect, accessCluster);

export default router;
