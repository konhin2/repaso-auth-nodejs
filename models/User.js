const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        required: [true, 'Email is required.'],
        match: [/^\S+@\S+\.\S+$/, 'Use a valid email.'],
        unique: true,
        trim: true
    },
    passwordHashed: String
}, {timestamps: true})

const userModel = mongoose.model("Users", userSchema)

module.exports = userModel