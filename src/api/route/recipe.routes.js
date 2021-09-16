import * as express from "express";
import { RecipeController } from "../controller";

const router = express.Router();

router.post("/", RecipeController.addRecipe);
router.get("/", RecipeController.listRecipes);
router.put("/:id", RecipeController.updateRecipe);
router.delete("/:id", RecipeController.deleteRecipe);
router.put("/:id/image/", RecipeController.addImage);
// TODO: GET IMAGE BY NAME

export default router;