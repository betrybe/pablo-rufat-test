const { RecipeService } = require("../service/index");
const { ERROR_BAD_REQUEST, ERROR_INTERNAL } = require("../utils/constants");
const { handleError } = require("../utils/errorHandler");
const { validateField, validateId } = require("../utils/validations");

const addRecipe = async (req, res, next) => {

    const payload = req.body;
    const authUser = req.body.authUser;

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
    return res.status(201).json({});
};

const deleteRecipe = async (req, res, next) => {
    return res.status(201).json({});
};

const addImage = async (req, res, next) => {
    return res.status(201).json({});
};

module.exports = {
    addRecipe,
    listRecipes,
    getRecipe,
    updateRecipe,
    deleteRecipe,
    addImage,
};