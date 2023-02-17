import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    name: {
        type: String,
        required: true
    },
    resetToken: {
        type: String
    },
    resetTokenExpires: {
        type: String
    }
}, { timestamps: true })

// hash before save
userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return next();
    };
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt)
});

// compare password
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const Users = mongoose.model("Users", userSchema);

export default Users;