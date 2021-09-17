const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        index: true,
        unique: true,
    },
    ingredients: {
        type: String,
        required: true,
    },
    preparation: {
        type: String,
        required: true,
    },
    userid: {
        type: String,
        required: true,
    },
    imageURL: String,
})

module.exports = mongoose.model('recipes', recipeSchema);