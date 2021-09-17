const { ERROR_UNAUTHORIZED, JWT_SECRET, ERROR_MISSING_TOKEN } = require("./constants");
const jwt = require("jsonwebtoken");
const { handleError } = require("./errorHandler");

const authJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        next(handleError(ERROR_MISSING_TOKEN));
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            next(handleError(ERROR_UNAUTHORIZED));
        }
        
        req.authUser = user;
        next();
    });
};

module.exports = { authJWT };