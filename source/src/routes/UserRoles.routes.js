const express = require('express');
const router = express.Router();
const userController = require('../controller/UserRoles.controller');

router.get('/', userController.getAllRoles);
module.exports = router;