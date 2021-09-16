import * as express from "express";
import RecipeController from "../controller";

const router = express.Router();

router.post("/recipes", RecipeController.addRecipe);
router.get("/recipes", RecipeController.listRecipes);
router.put("/recipes/:id", RecipeController.updateRecipe);
router.delete("/recipes/:id", RecipeController.deleteRecipe);
router.put("/recipes/:id/image/", RecipeController.addImage);
// TODO: GET IMAGE BY NAME

export default router;