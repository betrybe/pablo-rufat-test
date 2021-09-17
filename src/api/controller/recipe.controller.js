const { RecipeService } = require("../service/index");
const { ERROR_BAD_REQUEST } = require("../utils/constants");
const { handleError } = require("../utils/errorHandler");
const { validateField } = require("../utils/validations");

const addRecipe = async (req, res, next) => {

    const payload = req.body;
    const authUser = req.body.authUser;

    if (
        !validateField(payload.name) ||
        !validateField(payload.ingredients) ||
        !validateField(payload.preparation)
    ) {
        next(handleError(ERROR_BAD_REQUEST));
    }

    try {
        const response = await RecipeService.addRecipe(payload, authUser);
        return res.status(201).json({ recipe: response });
    } catch (e) {
        next(handleError(e));
    }
};
const listRecipes = async (req, res, next) => {
    return res.status(201).json({});
};
const getRecipe = async (req, res, next) => {
    return res.status(201).json({});
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