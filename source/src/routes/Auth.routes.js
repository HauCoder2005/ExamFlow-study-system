// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('..//controller/Auth.controller');

const loginController = require("../controller/Auth.controller");
const LoginController = require("../controller/Login/Login.controller");

router.post('/', LoginController.logins);
router.post('/register', LoginController.register);
module.exports = router;
