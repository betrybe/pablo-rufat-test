import * as express from "express";
import { userRouter, recipeRouter } from "./route";
import { UserController } from "./controller";

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use("/users", userRouter);
app.use("/recipes", recipeRouter);
app.post("/login", UserController.signIn);

export default app;
