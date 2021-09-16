const { ERROR_UNAUTHORIZED, JWT_SECRET } = require("../config/constants");
const jwt = require("jsonwebtoken");

const authJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(401).json({ message: ERROR_UNAUTHORIZED });
            }

            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({ message: ERROR_UNAUTHORIZED });
    }
};

module.exports = { authJWT };