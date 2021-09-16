import * as express from "express";
import UserController from "../controller";

const router = express.Router();

router.post("/users", UserController.signUp);
router.post("/users/admin", UserController.signUpAdmin);
router.post("/login", UserController.signIn);

export default router;