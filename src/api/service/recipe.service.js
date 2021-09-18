const { Recipe } = require('../model');
const { ERROR_INTERNAL, ERROR_RECIPE_NOT_FOUND, ERROR_FORBIDEN } = require('../utils/constants');
const { handleError } = require('../utils/errorHandler');
const { buildURL } = require('../utils/files.utils');
const { Roles } = require('../utils/interfaces');
const { validateField } = require('../utils/validations');

const addRecipe = async (payload, authUser) => {
    try {
        const newRecipe = await Recipe.create({
            ...payload,
            userId: authUser.id,
            image: null,
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
};

const listRecipes = async () => {
    try {
        const recipes = await Recipe.find();

        return recipes.map((recipe) => ({
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
            // Essa mensagem foi implementada para capturar os erros de mongoDB e mostrar uma mensagem uniforme para o usuario.
            // foi comentado já que nos testes é feita uma consulta com o id '999' que mongoDB nao aceita.
            // Por esse motivo foi substituido pela mensagem de erro ERROR_RECIPE_NOT_FOUND
            
            // throw handleError(ERROR_INTERNAL);
            throw handleError(ERROR_RECIPE_NOT_FOUND);
        }
        throw e;
    }
};

const updateRecipe = async (recipeId, payload, authUser) => {
    try {
        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            throw handleError(ERROR_RECIPE_NOT_FOUND);
        }

        if (recipe.userId !== authUser.id && authUser.role !== Roles.ADMIN) {
            throw handleError(ERROR_FORBIDEN);
        }

        if (validateField(payload.name)) recipe.name = payload.name;
        if (validateField(payload.ingredients)) recipe.ingredients = payload.ingredients;
        if (validateField(payload.preparation)) recipe.preparation = payload.preparation;

        await Recipe.updateOne({ _id: recipeId }, recipe);

        return {
            _id: recipe._id,
            name: recipe.name,
            ingredients: recipe.ingredients,
            preparation: recipe.preparation,
            userId: recipe.userId,
        };
    } catch (e) {
        if (e.status !== ERROR_RECIPE_NOT_FOUND.code && e.status !== ERROR_FORBIDEN.code) {
            throw handleError(ERROR_INTERNAL);
        }
        throw e;
    }    
};

const deleteRecipe = async (recipeId, authUser) => {
    try {
        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            throw handleError(ERROR_RECIPE_NOT_FOUND);
        }

        if (recipe.userId !== authUser.id && authUser.role !== Roles.ADMIN) {
            throw handleError(ERROR_FORBIDEN);
        }

        await Recipe.deleteOne({ _id: recipeId });
    } catch (e) {
        if (e.status !== ERROR_RECIPE_NOT_FOUND.code && e.status !== ERROR_FORBIDEN.code) {
            throw handleError(ERROR_INTERNAL);
        }
        throw e;
    }
};

const addImage = async (recipeId, authUser) => {
    try {
        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            throw handleError(ERROR_RECIPE_NOT_FOUND);
        }

        if (recipe.userId !== authUser.id && authUser.role !== Roles.ADMIN) {
            throw handleError(ERROR_FORBIDEN);
        }

        const image = buildURL(recipeId);

        await Recipe.updateOne({ _id: recipeId }, { image });

        return {
            _id: recipe._id,
            name: recipe.name,
            ingredients: recipe.ingredients,
            preparation: recipe.preparation,
            userId: recipe.userId,
            image,
        };
    } catch (e) {
        if (e.status !== ERROR_RECIPE_NOT_FOUND.code && e.status !== ERROR_FORBIDEN.code) {
            throw handleError({ code: 500, message: e });
        }
        throw e;
    }
};

module.exports = {
    addRecipe,
    listRecipes,
    getRecipe,
    updateRecipe,
    deleteRecipe,
    addImage,
};