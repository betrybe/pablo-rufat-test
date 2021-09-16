const { Roles } = require("../utils/interfaces");
const { User } = require("../model");

const signUp = (payload, role = Roles.USER) => {
    try {
        return User.create({
            ...payload,
            role
        });
    } catch (e) {
        console.log(e);
    }
}

const signIn = (payload) => {

}

module.exports = {
    signUp,
    signIn,
};