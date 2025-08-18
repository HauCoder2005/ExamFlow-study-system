const coursesRepository = require('../repositories/Courses.repository');
const coursesModel = require('../model/Courses.model');

const CoursesController = {
    async getAllCourses(req, res) {
        try {
            const courses = await coursesRepository.getAllCourses(); // Gọi repo đúng
            if (courses.length > 0) {
                const coursesAll = courses.map(course =>
                    new coursesModel(
                        course.id,
                        course.name,
                        course.description,
                        course.img,
                        course.teacher_id,
                        course.created_at,
                        course.updated_at
                    )
                );
                res.status(200).json(coursesAll);
            } else {
                res.status(404).json({ message: "Không có data!" });
            }
        } catch (error) {
            console.error("Lỗi khi lấy courses:", error);
            res.status(500).json({ message: "Lỗi server!" });
        }
    },
    async getCourseById(req, res) {
        const { id } = req.params;
        try {
            const CoursesId = await coursesRepository.getOneCourse(id);
            if (CoursesId) {
                res.status(200).json(CoursesId);
            } else {
                res.status(404).json({ message: "Không có dữ liệu!" });
            }
        }
        catch(err) {
            console.error("Lỗi khi lấy môn học theo ID:", err);
            res.status(500).json({ message: "Lỗi server", error: err.message });
        }
    }
};

module.exports = CoursesController;
