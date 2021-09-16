const { EMAIL_REGEX, ERROR_BAD_REQUEST, ERROR_ONLY_ADMIN } = require("../config/constants");
const { UserService } = require("../service/index");
const { Roles } = require("../utils/interfaces");

const signUp = async (req, res, next) => {

    const payload = req.body;

    if (
        !validateField(payload.name) ||
        !validateField(payload.email) ||
        !validateField(paylolad.password) ||
        !validateEmail(payload.email)
    ) {
        return res.status(ERROR_BAD_REQUEST.code).json({ message: ERROR_BAD_REQUEST.message });
    }

    try {
        const response = await UserService.signUp(payload);
        return res.status(201).json(response);
    } catch (e) {
        return res.status(e.status).json({ message: e.message });
    }
};

const signUpAdmin = async (req, res, next) => {
    
    const payload = req.body;
    const authUser = req.user;

    if (!authUser || authUser.role !== Roles.ADMIN) {
        return res.status(ERROR_ONLY_ADMIN.code).json({ message: ERROR_ONLY_ADMIN.message });
    }

    if (
        !validateField(payload.name) ||
        !validateField(payload.email) ||
        !validateField(paylolad.password) ||
        !validateEmail(payload.email)
    ) {
        return res.status(ERROR_BAD_REQUEST.code).json({ message: ERROR_BAD_REQUEST.message });
    }

    try {
        const response = await UserService.signUp(payload, Roles.ADMIN);
        return res.status(201).json(response);
    } catch (e) {
        return res.status(e.status).json({ message: e.message });
    }
};

const signIn = async (req, res, next) => {

    const payload = req.body;

    if (
        !validateField(payload.email) ||
        !validateField(paylolad.password) ||
        !validateEmail(payload.email)
    ) {
        return res.status(ERROR_ALL_FIELDS.code).json({ message: ERROR_ALL_FIELDS.message });
    }

    try {
        const response = await UserService.signIn(payload);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(e.status).json({ message: e.message });
    }
};

const validateField = (field) => {
    return field && typeof field === "string" && field.trim() !== "";
}

const validateEmail = (email) => {
    const regex = EMAIL_REGEX;
    return regex.test(String(email).toLowerCase());
}

module.exports = {
    signUp,
    signUpAdmin,
    signIn,
};