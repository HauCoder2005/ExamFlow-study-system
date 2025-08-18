const config = require('../config/config');

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
    async getExamsById(id){

    }
};
module.exports = ExamsRepository;