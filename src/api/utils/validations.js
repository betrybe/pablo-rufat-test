const { EMAIL_REGEX } = require("./constants");

const validateField = (field) => {
    return field && typeof field === "string" && field.trim() !== "";
}

const validateEmail = (email) => {
    const regex = EMAIL_REGEX;
    return regex.test(String(email).toLowerCase());
}

module.exports = { validateEmail, validateField };