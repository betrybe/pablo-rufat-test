const mongoose = require("mongoose");
const { Roles } = require("../utils/interfaces");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        index: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: Roles.USER,
    },
})

module.exports = mongoose.model('users', userSchema);