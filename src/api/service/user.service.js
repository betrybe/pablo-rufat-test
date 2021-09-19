const jwt = require('jsonwebtoken');
const { Roles } = require('../utils/interfaces');
const { User } = require('../model');
const {
    ERROR_MONGOOSE_DUPLICATE_KEY,
    ERROR_DUPLICATE_KEY,
    ERROR_INVALID_LOGIN,
    JWT_SECRET,
    ERROR_INTERNAL,
} = require('../utils/constants');
const { handleError } = require('../utils/errorHandler');

const signUp = async (payload, role = Roles.USER) => {
    try {
        const newUser = await User.create({
            ...payload,
            role,
        });

        return {
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            _id: newUser._id,
        };
    } catch (e) {
        if (e.code === ERROR_MONGOOSE_DUPLICATE_KEY) {
            throw handleError(ERROR_DUPLICATE_KEY);
        }
        throw handleError(ERROR_INTERNAL);
    }
};

const signIn = async (payload) => {
    try {
        const user = await User.findOne({ email: payload.email });

        if (!user || user.password !== payload.password) {
            throw handleError(ERROR_INVALID_LOGIN);
        }

        return jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET);
    } catch (e) {
        if (e.status !== ERROR_INVALID_LOGIN.code) {
            throw handleError(ERROR_INTERNAL);
        }
        throw e;
    }
};

module.exports = {
    signUp,
    signIn,
};