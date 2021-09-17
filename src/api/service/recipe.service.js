const { Recipe } = require("../model");
const { ERROR_INTERNAL } = require("../utils/constants");
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

module.exports = { addRecipe };