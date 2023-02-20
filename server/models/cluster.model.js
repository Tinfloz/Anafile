import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const clusterSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
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

clusterSchema.pre("save", async function () {
    if (!this.isModified('clusterCode')) {
        return next();
    };
    const salt = await bcrypt.genSalt(12);
    this.clusterCode = await bcrypt.hash(this.clusterCode, salt);
});

clusterSchema.methods.comparePassword = async function (accessCode) {
    return await bcrypt.compare(accessCode, this.clusterCode);
}

const Clusters = mongoose.model("Clusters", clusterSchema);

export default Clusters