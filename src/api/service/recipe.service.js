const { Recipe } = require("../model");
const { ERROR_INTERNAL, ERROR_RECIPE_NOT_FOUND } = require("../utils/constants");
const { handleError } = require("../utils/errorHandler");

const addRecipe = async (payload, authUser) => {

    try {
        const newRecipe = await Recipe.create({
            ...payload,
            userId: authUser.id,
            imageURL: null
        });

        return {
            name: newRecipe.name,
            ingredients: newRecipe.ingredients,
            preparation: newRecipe.preparation,
            userId: newRecipe.userId,
            _id: newRecipe._id,
        };

    } catch (e) {
        throw handleError(ERROR_INTERNAL);
    }
}

const listRecipes = async () => {
    try {

        const recipes = await Recipe.find();

        return recipes.map(recipe => ({
            _id: recipe._id,
            name: recipe.name,
            ingredients: recipe.ingredients,
            preparation: recipe.preparation,
            userId: recipe.userId,
        }));
        
    } catch (e) {
        throw handleError(ERROR_INTERNAL);
    }
};

const getRecipe = async (recipeId) => {
    try {

        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            throw handleError(ERROR_RECIPE_NOT_FOUND);
        }

        return {
            _id: recipe._id,
            name: recipe.name,
            ingredients: recipe.ingredients,
            preparation: recipe.preparation,
            userId: recipe.userId,
        };
        
    } catch (e) {
        if (e.status !== ERROR_RECIPE_NOT_FOUND.code) {
            throw handleError(ERROR_INTERNAL);
        }
        throw e;
    }
};

module.exports = { addRecipe, listRecipes, getRecipe };