import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
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
})

const Recipe = mongoose.model('recipes', RecipeSchema)

export default Recipe;