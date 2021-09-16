import { ERROR_UNAUTHORIZED, JWT_SECRET } from "../config/constants";
import * as jwt from "jsonwebtoken";

export default authJWT = (req, res, next) => {
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