const { ERROR_UNAUTHORIZED, JWT_SECRET } = require("./constants");
const jwt = require("jsonwebtoken");
const { handleError } = require("./errorHandler");

const authJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        next(handleError(ERROR_UNAUTHORIZED));
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            next(handleError(ERROR_UNAUTHORIZED));
        }
        
        req.body.authUser = user;
        next();
    });
};

module.exports = { authJWT };