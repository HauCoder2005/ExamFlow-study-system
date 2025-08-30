const config = require('../config/config');
const QuestionModel = require('../model/Question.model');
const ExamsRepository = {
    async getAllExams() {
        const sql = `SELECT * FROM exams`;
        return new Promise((resolve, reject) => {
            config.query(sql, (err, result) => {
                if (err) return reject(err);
                resolve(result.map(exam => ({
                    id: exam.id,
                    title: exam.title,
                    course_id: exam.course_id,
                    teacher_id: exam.teacher_id,
                    type: exam.type,
                    time_limit: exam.time_limit,
                    total_score: exam.total_score,
                    created_at: exam.created_at,
                })));
            });
        })
    },

    /*
    * lấy đề thi theo ID này cho student nhé
    * Id này sẽ là id của môn học, note ra tránh nhầm lẫn
    * */
    async createExamByTeacher(examsData) {
        const { course_id, teacher_id, title, type, time_limit, total_score, status } = examsData;
        console.log(examsData);
        const sql = `
            INSERT INTO exams (course_id, teacher_id, title, type, time_limit, total_score, status)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        return new Promise((resolve, reject) => {
            config.query(sql, [course_id, teacher_id, title, type, time_limit, total_score ,status], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },


    async createQuestionByTeacher(examsData) {
        const { exam_id, question_text, question_type, score } = examsData;
        console.log(examsData);
        const sql = `
            INSERT INTO questions (exam_id, question_text, question_type, score) 
            VALUES (?, ?, ?, ?)
        `;
        return new Promise((resolve, reject) => {
            config.query(sql, [exam_id ,question_text, question_type, score], (err, result) => {
                if (err) return reject(err);
                else resolve(result);
            })
        })
    },


    async createOptionByTeacher(examData) {
        const { question_id, option_text, is_correct } = examData;
        console.log(examData);
        const sql = `
            INSERT INTO options (question_id, option_text, is_correct) 
            VALUES (?, ?, ?)
        `
        return new Promise((resolve, reject) => {
            config.query(sql, [question_id, option_text, is_correct], (err, result) => {
                if (err) return reject(err);
                else resolve(result);
            })
        })
    },

    async deleteQuestionById(question_id) {
        const deleteOptionsSql = `DELETE FROM options WHERE question_id = ?;`;
        const deleteQuestionSql = `DELETE FROM questions WHERE id = ?;`;

        return new Promise((resolve, reject) => {
            config.query(deleteOptionsSql, [question_id], (err) => {
                if (err) return reject(err);

                config.query(deleteQuestionSql, [question_id], (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });
        });
    },



    async deleteOptionById(option_id) {
        return new Promise((resolve, reject) => {
            const deleteSql = `DELETE FROM options WHERE id = ?;`;
            config.query(deleteSql, [option_id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },


    async updateQuestionById(examData) {
        const { question_id ,question_text, question_type, score } = examData;
        const sql = `
            UPDATE questions
            SET question_text = ?, question_type = ?, score = ?
            WHERE id = ?;
    `;
        return new Promise((resolve, reject) => {
            config.query(sql, [question_text, question_type, score, question_id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },

    async updateOptionById(examData) {
        const { option_text, is_correct, option_id ,question_id } = examData;
        const sql = `
            UPDATE options 
            SET option_text=?, is_correct=?
            WHERE id = ? AND question_id = ?;    
        `;
        return new Promise((resolve, reject) => {
            config.query(sql, [option_text, is_correct, option_id, question_id], (err, result) => {
                if (err) return reject(err);
                resolve(result);

            })
        })
    },

    async getAllQuestion(exam_id) {
        console.log(exam_id);
        const sql = `
        SELECT
            q.id AS questionId,
            q.exam_id,
            q.question_text,
            q.question_type,
            q.score,
            q.created_at AS question_created_at,
            o.id AS optionId,
            o.option_text,
            o.is_correct,
            o.created_at AS option_created_at
        FROM questions q
                 LEFT JOIN options o ON o.question_id = q.id
        WHERE q.exam_id = ?;
        `;
        return new Promise((resolve, reject) => {
            config.query(sql, [exam_id], (err, result) => {
                if (err) return reject(err);

                const questionsMap = new Map();

                result.forEach(row => {
                    const questionId = row.questionId;
                    if (!questionsMap.has(questionId)) {
                        questionsMap.set(questionId, new QuestionModel(
                            row.questionId,
                            row.exam_id,
                            row.question_text,
                            row.question_type,
                            row.score,
                        ));
                    }

                    const question = questionsMap.get(questionId);
                    if (row.optionId) {
                        if (!question.options) question.options = [];
                        question.options.push({
                            id: row.optionId,
                            option_text: row.option_text,
                            is_correct: row.is_correct,
                            created_at: row.option_created_at
                        });
                    }
                });

                resolve(Array.from(questionsMap.values()));
            });
        });
    },

    async getExamsByTeacherAndCourse(teacher_id, course_id) {
        const sql = `
            SELECT
                e.id AS exam_id,
                e.title AS exam_title,
                e.type AS exam_type,
                e.time_limit,
                e.total_score,
                e.created_at,
                e.status,
                c.name,
                u.first_name,
                u.last_name
            FROM exams e
                     JOIN courses c ON e.course_id = c.id
                     JOIN users u ON e.teacher_id = u.id
            WHERE e.course_id = ? AND e.teacher_id = ?;
        `;
        return new Promise((resolve, reject) => {
            config.query(sql, [course_id, teacher_id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }



};
module.exports = ExamsRepository;