const { RecipeService } = require("../service/index");
const { ERROR_BAD_REQUEST } = require("../utils/constants");
const { handleError } = require("../utils/errorHandler");
const { removeInvalidImage } = require("../utils/files.utils");
const { validateField, validateId } = require("../utils/validations");

const addRecipe = async (req, res, next) => {

    const payload = req.body;
    const authUser = req.authUser;

    if (
        !validateField(payload.name) ||
        !validateField(payload.ingredients) ||
        !validateField(payload.preparation)
    ) {
        next(handleError(ERROR_BAD_REQUEST));
        return;
    }

    try {
        const response = await RecipeService.addRecipe(payload, authUser);
        return res.status(201).json({ recipe: response });
    } catch (e) {
        next(e);
    }
};

const listRecipes = async (req, res, next) => {
    try {
        const response = await RecipeService.listRecipes();
        return res.status(200).json(response);
    } catch (e) {
        next(e);
    }
};

const getRecipe = async (req, res, next) => {

    const recipeId = req.params.id;

    if (!validateId(recipeId)){
        next(handleError(ERROR_BAD_REQUEST));
        return;
    }

    try {
        const response = await RecipeService.getRecipe(recipeId);
        return res.status(200).json(response);
    } catch (e) {
        next(e);
    }
};

const updateRecipe = async (req, res, next) => {

    const recipeId = req.params.id;
    const payload = req.body;
    const authUser = req.authUser;

    if (!validateId(recipeId)){
        next(handleError(ERROR_BAD_REQUEST));
        return;
    }

    try {
        const response = await RecipeService.updateRecipe(recipeId, payload, authUser);
        return res.status(200).json(response);
    } catch (e) {
        next(e);
    }
};

const deleteRecipe = async (req, res, next) => {

    const recipeId = req.params.id;
    const authUser = req.authUser;

    if (!validateId(recipeId)){
        next(handleError(ERROR_BAD_REQUEST));
        return;
    }

    try {
        await RecipeService.deleteRecipe(recipeId, authUser);
        return res.status(204).send();
    } catch (e) {
        next(e);
    }
};

const addImage = async (req, res, next) => {

    const recipeId = req.params.id;
    const authUser = req.authUser;


    if (!validateId(recipeId)){
        removeInvalidImage();
        next(handleError(ERROR_BAD_REQUEST));
        return;
    }

    try {
        const response = await RecipeService.addImage(recipeId, authUser);
        return res.status(200).json(response);
    } catch (e) {
        removeInvalidImage(recipeId);
        next(e);
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