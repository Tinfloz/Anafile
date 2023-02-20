import express from "express";
import { accessAFile, createFile } from "../controllers/file.controllers.js";
import { upload } from "../helpers/multer.save.file.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/upload/file").post(protect, upload.single("file"), createFile);
router.route("/access/file").post(protect, accessAFile);

export default router;