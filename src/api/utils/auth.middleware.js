const jwt = require('jsonwebtoken');
const { ERROR_UNAUTHORIZED, JWT_SECRET, ERROR_MISSING_TOKEN } = require('./constants');
const { handleError } = require('./errorHandler');

const authJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        next(handleError(ERROR_MISSING_TOKEN));
    }

    // Originalmente foi ideado um sistema de autenticação com um formato 'Bearer xxxxxxxx'.
    // foi removido o 'Bearer ' para se ajustar aos testes automatizados.
    jwt.verify(authHeader, JWT_SECRET, (err, user) => {
        if (err) {
            next(handleError(ERROR_UNAUTHORIZED));
        }
        
        req.authUser = user;
        next();
    });
};

module.exports = { authJWT };