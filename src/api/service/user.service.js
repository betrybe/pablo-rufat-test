const { Roles } = require("../utils/interfaces");
const { User } = require("../model");
const { ERROR_MONGOOSE_DUPLICATE_KEY, ERROR_DUPLICATE_KEY } = require("../utils/constants");

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

const signIn = (payload) => {

}

module.exports = {
    signUp,
    signIn,
};