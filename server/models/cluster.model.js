import mongoose from "mongoose";

const clusterSchema = new mongoose.Schema({
    members: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Users"
        }
    ],
    files: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Files"
        }
    ],
    clusterCode: {
        type: String,
        required: true
    },
    admin: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Users"
        }
    ]
}, { timestamps: true })

const Clusters = mongoose.model("Clusters", clusterSchema);

export default Clusters