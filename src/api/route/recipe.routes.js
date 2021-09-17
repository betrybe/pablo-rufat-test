const express = require('express');
const { RecipeController } = require('../controller/index');
const { authJWT } = require('../utils/auth.middleware');
const { uploadImage } = require('../utils/multer.middleware');

const router = express.Router();

router.post('/', [authJWT], RecipeController.addRecipe);
router.get('/', RecipeController.listRecipes);
router.get('/:id', RecipeController.getRecipe);
router.put('/:id', [authJWT], RecipeController.updateRecipe);
router.delete('/:id', [authJWT], RecipeController.deleteRecipe);

// Originalmente pensei em usar a o verbo PATCH. Acho que faz mais sentido, já que só é modificado um campo da receita
// Foi substituido por PUT para se ajustar aos testes automaticos.

router.put('/:id/image/', [authJWT, uploadImage], RecipeController.addImage);

module.exports = router;