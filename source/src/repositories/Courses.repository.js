const config = require("../config/config");
const CoursesRepository = {
        async getAllCourses() {
            const sql = `SELECT * FROM courses`;
            return new Promise((resolve, reject) => {
                config.query(sql, (err, result) => {
                    if (err) return reject(err);
                    resolve(result.map(course => ({
                        id: course.id,
                        name: course.name,
                        description: course.description,
                        img: course.img,
                        teacher_id: course.teacher_id,
                        createdAt: course.createdAt,
                    })));
                });
            })
        },
    async getOneCourse(id) {
            const sql = `SELECT * FROM courses WHERE id = ?`;
            return new Promise((resolve, reject) => {
                config.query(sql, [id] ,(err, result) => {
                    if (err) return reject(err);
                    resolve(result.map(course => ({
                        id: course.id,
                        name: course.name,
                        description: course.description,
                        img: course.img,
                        teacher_id: course.teacher_id,
                        createdAt: course.createdAt,
                    })))
                })
            })
    }

}
module.exports = CoursesRepository;
