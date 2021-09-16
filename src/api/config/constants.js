const MONGO_DB_URL = "mongodb://localhost:27017/Cookmaster";
const DB_NAME = "Cookmaster";
const JWT_SECRET = "The_Ultra_Secret_1991";
const PORT = 3000;

const ERROR_UNAUTHORIZED = "jwt malformed";
const ERROR_BAD_REQUEST = "Invalid entries. Try again.";

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = {
    MONGO_DB_URL,
    DB_NAME,
    JWT_SECRET,
    PORT,
    ERROR_UNAUTHORIZED,
    ERROR_BAD_REQUEST,
    EMAIL_REGEX
};