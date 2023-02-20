import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const fileSchema = new mongoose.Schema({
    fileString: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    cluster: {
        type: mongoose.Types.ObjectId,
        ref: "Clusters",
        required: true
    },
    access: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Users"
        }
    ],
    accessCode: {
        type: String,
        required: true
    }
}, { timestamps: true })

fileSchema.pre("save", async function () {
    if (!this.isModified("accessCode")) {
        return next()
    };
    const salt = await bcrypt.genSalt(12);
    this.accessCode = await bcrypt.hash(this.accessCode, salt);
});

fileSchema.methods.compareAccessCode = async function (code) {
    return await bcrypt.compare(code, this.accessCode);
};

const Files = mongoose.model("Files", fileSchema);

export default Files;