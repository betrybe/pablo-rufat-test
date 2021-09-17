const MONGO_DB_URL = "mongodb://localhost:27017/Cookmaster";
const DB_NAME = "Cookmaster";
const JWT_SECRET = "The_Ultra_Secret_1991";
const PORT = 3000;

const CONNECTION_ERROR = "MongoDB Connection error.";
const CONNECTION_MESSAGE = "Connecting to MongoDB...";

const ERROR_UNAUTHORIZED = { code: 401, message: "jwt malformed" };
const ERROR_BAD_REQUEST = { code: 400, message: "Invalid entries. Try again." };
const ERROR_ONLY_ADMIN = { code: 403, message: "Only admins can register new admins." };
const ERROR_ALL_FIELDS = { code: 401, message: "All fields must be filed." };
const ERROR_DUPLICATE_KEY = { code: 409, message: "Email already registered." };
const ERROR_INVALID_LOGIN = { code: 401, message: "Incorrect username or password." };
const ERROR_INTERNAL = { code: 500, message: "Internal error" };

const ERROR_MONGOOSE_DUPLICATE_KEY = 11000;

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = {
    MONGO_DB_URL,
    DB_NAME,
    JWT_SECRET,
    PORT,
    ERROR_UNAUTHORIZED,
    ERROR_BAD_REQUEST,
    EMAIL_REGEX,
    ERROR_ONLY_ADMIN,
    ERROR_ALL_FIELDS,
    CONNECTION_ERROR,
    CONNECTION_MESSAGE,
    ERROR_MONGOOSE_DUPLICATE_KEY,
    ERROR_DUPLICATE_KEY,
    ERROR_INVALID_LOGIN,
    ERROR_INTERNAL,
};