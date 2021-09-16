const express = require("express");
const { userRouter, recipeRouter } = require("./route");
const { UserController } = require("./controller");
const path = require('path');

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use("/users", userRouter);
app.use("/recipes", recipeRouter);
app.post("/login", UserController.signIn);
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

module.exports = app;
