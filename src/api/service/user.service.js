const { Roles } = require("../utils/interfaces");
const { User } = require("../model");
const { ERROR_MONGOOSE_DUPLICATE_KEY, ERROR_DUPLICATE_KEY, ERROR_INVALID_LOGIN, JWT_SECRET } = require("../utils/constants");
const jwt = require("jsonwebtoken");

const signUp = async (payload, role = Roles.USER) => {
    try {
        const newUser = await User.create({
            ...payload,
            role
        });

        return {
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            _id: newUser._id,
        };

    } catch (e) {
        if (e.code === ERROR_MONGOOSE_DUPLICATE_KEY) {
            let error = new Error(ERROR_DUPLICATE_KEY.message);
            error.status = ERROR_DUPLICATE_KEY.code;
            throw error;
        }
        let error = new Error(e);
        error.status = 500;
        throw error;
    }
}

const signIn = async (payload) => {
    try {
        const user = await User.findOne({ email: payload.email });

        if (!user || user.password !== payload.password) {
            let error = new Error(ERROR_INVALID_LOGIN.message);
            error.status = ERROR_INVALID_LOGIN.code;
            throw error;
        }

        return jwt.sign({ id: user._id, email: user.email,  role: user.role }, JWT_SECRET);

    } catch (e) {
        if (e.status !== ERROR_INVALID_LOGIN.code) {
            let error = new Error(e);
            error.status = 500;
            throw error;
        }
        throw e;
    }
}

module.exports = {
    signUp,
    signIn,
};