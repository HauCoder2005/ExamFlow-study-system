const express = require('express');

const userRolesController = require("../controller/Users.controller");
const router = express.Router();

router.get('/', userRolesController.getAllUsers);
router.get('/:id', userRolesController.getUserById);
router.put('/edit-user/:id', userRolesController.EditUserById)
router.get('/teacher/:id', userRolesController.getAllStudents);
module.exports = router;