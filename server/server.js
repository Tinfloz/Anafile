import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/error.middleware.js";
import userRouter from "./routes/user.routes.js";
import clusterRouter from "./routes/cluster.routes.js";
import fileRouter from "./routes/file.routes.js"
// import multer from "multer";
// import { protect } from "./middlewares/auth.middleware.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

// middlewares
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.json());

// mongoose
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => console.log("connected to mongo"))
    .catch(err => console.error(err))

// test
app.get("/", (req, res) => {
    res.json({
        message: "connected!"
    });
});

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         console.log(file)
//         cb(null, "uploads");
//     },
//     filename: (req, file, cb) => {
//         cb(null, `uploads-${file.originalname}`)
//     },
// });

// const upload = multer({ storage: storage });

// app.post("/upload/file", protect, upload.single("file"), (req, res) => {
//     const file = req.file;
//     console.log(file.filename);
// })

// endpoints
app.use("/api/user", userRouter);
app.use("/api/cluster", clusterRouter);
app.use("/api/file", fileRouter);

app.use(errorHandler)
app.listen(port, () => console.log(`listening on port: ${port}`))