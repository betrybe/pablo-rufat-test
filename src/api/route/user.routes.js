import * as express from "express";
import { UserController } from "../controller";

const router = express.Router();

router.post("/", UserController.signUp);
router.post("/admin", UserController.signUpAdmin);

export default router;