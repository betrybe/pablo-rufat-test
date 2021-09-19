const handleError = (error) => {
    const newError = new Error(error.message);
    newError.status = error.code;
    return newError;
};

module.exports = { handleError };