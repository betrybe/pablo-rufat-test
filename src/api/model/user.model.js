import mongoose from "mongoose";
import { Roles } from "../interfaces";

const UserSchema = new mongoose.Schema({
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
        type: Roles,
        required: true,
        default: Roles.USER,
    },
})

const User = mongoose.model('User', UserSchema)

export default User;