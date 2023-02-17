import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    fileString: {
        type: String,
        required: true
    },
    cluster: {
        type: String,
        ref: "Clusters"
    }
}, { timestamps: true })

const Files = mongoose.model("Files", fileSchema);

export default Files;