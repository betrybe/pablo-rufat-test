const fs = require('fs');

const buildURL = (recipeId) => {
    return `localhost:3000/images/${recipeId}.jpeg`;
};

const removeInvalidImage = (filename = "invalid") => {
    const path = `src/uploads/${filename}.jpeg`
    fs.unlink(path, (err) => {});
};

module.exports = { removeInvalidImage, buildURL };