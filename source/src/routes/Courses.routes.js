const express = require('express');
const router = express.Router();
const courseController = require("../controller/Courses.controller");
router.get("/", courseController.getAllCourses);
router.get("/courses/:id", courseController.getCourseById);
module.exports = router;