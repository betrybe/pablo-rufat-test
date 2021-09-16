const express = require("express");
const { UserController } = require("../controller/index.js");

const router = express.Router();

router.post("/", UserController.signUp);
router.post("/admin", UserController.signUpAdmin);

module.exports = router;