const express = require("express");
const { RecipeController } = require("../controller/index");
const { authJWT } = require("../utils/auth.middleware");

const router = express.Router();

router.post("/", [authJWT], RecipeController.addRecipe);
router.get("/", RecipeController.listRecipes);
router.get("/:id", RecipeController.getRecipe);
router.put("/:id", [authJWT], RecipeController.updateRecipe);
router.delete("/:id", [authJWT], RecipeController.deleteRecipe);
router.patch("/:id/image/", [authJWT], RecipeController.addImage);

module.exports = router;