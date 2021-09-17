const mongoose = require('mongoose');

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
    userId: {
        type: String,
        required: true,
    },
    // Foi alterado o nome do campo de 'imageURL' para 'image' para se ajustar aos testes automatizados.
    image: String,
});

module.exports = mongoose.model('recipes', recipeSchema);