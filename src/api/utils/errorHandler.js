
const handleError = (error) => {
    let newError = new Error(error.message);
    newError.status = error.code;
    return newError;
};

module.exports = { handleError };