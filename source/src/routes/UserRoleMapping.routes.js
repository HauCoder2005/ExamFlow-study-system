const express = require('express');
const router = express.Router();
const userRoleController = require('../controller/UserRoleMapping.controller');

router.get('/', userRoleController.getAllUserRoleMapping);
module.exports = router;