const express = require('express');
const router = express.Router();
const examsController = require('../controller/Exams.controller');
const authenticate = require('../middleware/authMiddleware');
router.get('/:course_id', authenticate ,examsController.getExamsByTeacherAndCourse);
// create data
router.post('/create-exams/:course_id', authenticate ,examsController.createExams);

// question data
router.post('/create-question/:exam_id', authenticate ,examsController.createQuestion);

// option data
router.post('/create-option/:question_id', authenticate ,examsController.createOption);

// get question data
router.get('/question/:exam_id', examsController.getAllQuestions);

// delete question
router.delete('/question/:question_id', authenticate, examsController.deleteQuestionByIds);

// delete options
router.delete('/option/:option_id', authenticate, examsController.deleteOptionByIds);

// update question
router.put('/edit-question/:question_id', authenticate, examsController.updateQuestion);

// update options
router.put('/questions/:question_id/edit-option/:option_id', authenticate, examsController.updateOptionByIds);
module.exports = router;