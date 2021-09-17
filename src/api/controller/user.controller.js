const { ERROR_BAD_REQUEST, ERROR_ONLY_ADMIN, ERROR_ALL_FIELDS, ERROR_INVALID_LOGIN } = require("../utils/constants");
const { UserService } = require("../service/index");
const { Roles } = require("../utils/interfaces");
const { validateField, validateEmail } = require("../utils/validations");
const { handleError } = require("../utils/errorHandler");

const signUp = async (req, res, next) => {

    const payload = req.body;

    if (
        !validateField(payload.name) ||
        !validateField(payload.email) ||
        !validateField(payload.password) ||
        !validateEmail(payload.email)
    ) {
        next(handleError(ERROR_BAD_REQUEST));
    }

    try {
        const response = await UserService.signUp(payload);
        return res.status(201).json({ user: response });
    } catch (e) {
        next(handleError(e));
    }
};

const signUpAdmin = async (req, res, next) => {
    
    const payload = req.body;
    const authUser = req.body.authUser;

    if (!authUser || authUser.role !== Roles.ADMIN) {
        next(handleError(ERROR_ONLY_ADMIN));
    }

    if (
        !validateField(payload.name) ||
        !validateField(payload.email) ||
        !validateField(payload.password) ||
        !validateEmail(payload.email)
    ) {
        next(handleError(ERROR_BAD_REQUEST));
    }

    try {
        const response = await UserService.signUp(payload, Roles.ADMIN);
        return res.status(201).json(response);
    } catch (e) {
        next(handleError(e));
    }
};

const signIn = async (req, res, next) => {

    const payload = req.body;

    if (
        !validateField(payload.email) ||
        !validateField(payload.password)
    ) {
        next(handleError(ERROR_ALL_FIELDS));
    }

    if (!validateEmail(payload.email)) {
        next(handleError(ERROR_INVALID_LOGIN));
    }

    try {
        const response = await UserService.signIn(payload);
        return res.status(200).json({ token: response });
    } catch (e) {
        next(handleError(e));
    }
};

module.exports = {
    signUp,
    signUpAdmin,
    signIn,
};