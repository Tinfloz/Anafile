import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/error.middleware.js";
import userRouter from "./routes/user.routes.js";
import clusterRouter from "./routes/cluster.routes.js";
import fileRouter from "./routes/file.routes.js";
import searchRouter from "./routes/search.routes.js";

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

// endpoints
app.use("/api/user", userRouter);
app.use("/api/cluster", clusterRouter);
app.use("/api/file", fileRouter);
app.use("/api/search", searchRouter);

app.use(errorHandler)
app.listen(port, () => console.log(`listening on port: ${port}`))