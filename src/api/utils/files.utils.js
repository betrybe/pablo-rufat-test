const fs = require('fs');

// Inicialmente foi usada a rota 'localhost:3000/images/' para deixar igual à rota estatica.
// Foi alterado para 'localhost:3000/src/uploads/' para se ajustar aos testes automatizados.
const buildURL = (recipeId) => `localhost:3000/src/uploads/${recipeId}.jpeg`;

const removeInvalidImage = (filename = 'invalid') => {
    const path = `src/uploads/${filename}.jpeg`;
    fs.unlink(path, () => {});
};

module.exports = { removeInvalidImage, buildURL };