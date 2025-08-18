const express = require('express');
const router = express.Router();
const examsController = require('../controller/Exams.controller');
const userController = require('../controller/Users.controller');
router.get('/', examsController.getAllExams);
module.exports = router;