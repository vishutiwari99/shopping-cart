const crypto = require("crypto");
const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
        match: [
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
            "Please provide a valid email address"
        ]
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 6,
        select: false
    },
    role: {
        type: Number,
        default: 0
    },
    cart: {
        type: Array,
        default: []
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, {
    timestamps: true
});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.getSignedToken = function () {
    return jwt.sign({
        id: this._id
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}
userSchema.methods.getPassword = function () {
    return jwt.sign({
        id: this._id
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000)
    return resetToken;
}


const User = mongoose.model("User", userSchema);

module.exports = User;