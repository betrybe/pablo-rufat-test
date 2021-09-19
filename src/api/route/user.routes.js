const express = require('express');
const { UserController } = require('../controller');
const { authJWT } = require('../utils/auth.middleware');

const router = express.Router();

router.post('/', UserController.signUp);
router.post('/admin', authJWT, UserController.signUpAdmin);

module.exports = router;