const ExamsRepository = require("../repositories/Exams.repository");

const ExamsController = {
    async getAllExams(req, res) {
        try {
            const examsRepository = await ExamsRepository.getAllExams();
            if(examsRepository.length > 0) {
                return res.status(200).json(examsRepository);
            }
            else
            {
                return res.status(404).json({message: 'No Data Exams'});
            }
        } catch (err) {
            res.status(500).json( {message: 'Lỗi khi lấy danh sách exmas', err })
        }
    },


    async createExams(req, res) {
        try {
            const teacher_id = req.user.id;
            const {course_id} = req.params;
            const {title, type, time_limit, total_score, status} = req.body;
            const examsData = {course_id, teacher_id, title, type, time_limit, total_score, status};
            console.log(examsData);
            const createExams = await ExamsRepository.createExamByTeacher(examsData)

            if (createExams.affectedRows > 0) {
                return res.status(201).json({
                    message: "Tạo exam thành công",
                    examId: createExams.insertId
                });
            } else {
                return res.status(400).json({message: "Tạo exam thất bại"});
            }
        } catch (err) {
            res.status(500).json(
                {
                    message: "Lỗi thi thêm bài thi", err
                }
            )
        }
    },



    async updateExams(req, res) {
        try {
            const {exam_id} = req.params;
            const teacher_id = req.user.id;
            const {title, type, time_limit, total_score, status} = req.body;
            const examData = {
                exam_id,
                teacher_id,
                title,
                type,
                time_limit,
                total_score,
                status
            }
            const updateExam = await ExamsRepository.updateExamByIdTeacher(examData);
            if (updateExam.affectedRows > 0) {
                return res.status(200).json({
                    message: "Chỉnh sửa bài thi thành công!",
                    examData
                })
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Lỗi chỉnh sửa bài thi!", err
            })
        }

    },


    async deleteExam(req, res) {
        try {
            const { exam_id } = req.params;
            const teacher_id = req.user.id;

            console.log(teacher_id,exam_id);
            // if (exam_id != null) {
            //     return res.status(400).json({
            //         message: "exam hợp lệ!"
            //     });
            // }

            const result = await ExamsRepository.deleteExamByIdTeacher(exam_id, teacher_id);

            console.log("Delete result:", result);

            if (result.affectedRows > 0) {
                return res.status(200).json({
                    message: "Xoá bài thi thành công!",
                    exam_id
                });
            } else {
                return res.status(404).json({
                    message: "Không tìm thấy bài thi hoặc bạn không có quyền xoá!"
                });
            }

        } catch (err) {
            console.error("Delete exam error:", err);
            return res.status(500).json({
                message: "Lỗi khi xoá bài thi!",
                err
            });
        }
    },

    async updateStatusExams(req, res) {
        try {
            const {status} = req.body;
            const {exam_id} = req.params;
            const teacher_id = req.user.id;
            console.log(exam_id, status, teacher_id);
            const updateStatusExams = await  ExamsRepository.updateStatusExams(exam_id, teacher_id ,status);
            if(updateStatusExams.affectedRows > 0) {
                return res.status(200).json({
                    message: "Cập nhập trạng thái thành công! Bạn đã được phép xoá bài thi.",
                    status
                })
            }
            else {
                res.status(404).json({
                    message: "Cập nhập trạng thái thất bại! Vui lòng kiểm tra lại exam repositories."
                });
            }
        }
        catch(err) {
            res.status(500).json({
                message: "Lỗi hệ thống khi cập nhập lại status bài thi!",
                err
            })
        }

    },

    async createQuestion(req, res) {
        try {
            const {exam_id} = req.params;
            const {question_text, question_type, score} = req.body;
            const examData = {exam_id, question_text, question_type, score};
            console.log(examData);
            const createQuestion = await ExamsRepository.createQuestionByTeacher(examData);
            if (createQuestion.affectedRows > 0) {
                return res.status(201).json({
                    message: "Thêm thành công Câu hỏi!",
                    examData
                })
            } else {
                return res.status(400).json({message: "Tạo question thất bại"});
            }
        } catch (err) {
            res.status(500).json(
                {
                    message: "Lỗi thi thêm bài thi", err
                }
            )
        }
    },


    async createOption(req, res) {
        try {
            const {question_id} = req.params;
            const { option_text, is_correct } = req.body;
            const examData = { question_id, option_text, is_correct };
            console.log(examData);
            const createOption = await ExamsRepository.createOptionByTeacher(examData);
            if (createOption.affectedRows > 0) {
                return res.status(201).json({
                    message: "Thêm câu đáp án thành công",
                    examData
                })
            }
            else {
                return res.status(400).json(
                    {
                        message: "Tạo option thất bại!"
                    }
                );
            }
        }
        catch (err) {
            res.status(500).json({
                message: "lỗi khi thêm bài thi", err
            })
        }
    },


    async deleteQuestionByIds(req, res) {
        try {
            const {question_id} = req.params;
            const deleteQuestion = await ExamsRepository.deleteQuestionById(question_id);
            if (deleteQuestion.affectedRows > 0) {
                return res.status(201).json({
                    message: "Xoá question thành công!",
                    question_id
                })
            }
            return res.status(404).json({ message: "Không tìm thấy question để xoá!" });
        }
        catch (err) {
            res.status(500).json({
                message: "Xoá question thất bại!",
                err
            })
        }
    },


    async updateQuestion(req, res) {
        try {
            const { question_id } = req.params;
            const { question_text, question_type, score } = req.body;

            const examData = { question_id, question_text, question_type, score };
            const result = await ExamsRepository.updateQuestionById(examData);

            if (result.affectedRows > 0) {
                return res.status(200).json({ message: "Question updated successfully", examData });
            }
            return res.status(404).json({ message: "Question not found" });
        } catch (error) {
            console.error("Error updating question:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },


    async deleteOptionByIds(req, res) {
        try {
            const { option_id } = req.params;

            const deleteQuestion = await ExamsRepository.deleteOptionById(option_id);
            console.log("DELETE RESULT:", deleteQuestion);

            if (deleteQuestion.affectedRows > 0) {
                return res.status(200).json({
                    message: "Xoá option thành công!",
                    option_id
                });
            } else {
                return res.status(404).json({
                    message: "Option không tồn tại hoặc đã bị xoá!"
                });
            }
        } catch (err) {
            console.error("Error deleteOptionByIds:", err);
            return res.status(500).json({
                message: "Xoá option thất bại!"
            });
        }
    },

    async updateOptionByIds(req, res) {
        try {
            const { option_id, question_id } = req.params;
            console.log(option_id,question_id);
            const { option_text, is_correct } = req.body;
            const examData = { option_text, is_correct, option_id, question_id };
            const updateOption = await ExamsRepository.updateOptionById(examData);
            if (updateOption.affectedRows > 0) {
                return res.status(200).json({
                    message: "Chỉnh sửa options thành công!", examData
                })
            }
            else {
                return res.status(404).json({
                    message: "Chỉnh sửa options thất bại!"
                })
            }
        }
        catch (err) {
            return res.status(500).json({
                message: "Lỗi api options!"
            });
        }
    },

    async getAllQuestions(req, res) {
        try {
            const { exam_id } = req.params;
            console.log(exam_id);
            const examData = await  ExamsRepository.getAllQuestion(exam_id);
            console.log(examData);
            if (examData.length > 0) {
                return res.status(200).json(
                    {
                        message: "Lấy dữ liệu question thành công: ", examData
                    }
                );
            }
            else {
                return res.status(400).json(
                    {
                        message: "lấy dữ liệu question thất bại!"
                    }
                );
            }
        }
        catch (err) {
            res.status(500).json({
                message: "lỗi khi lất bài thi!", err
            })
        }
    },


    async getExamsByTeacherAndCourse(req, res) {
        try {
            const teacher_id = req.user.id;
            const { course_id } = req.params;
            const exams = await ExamsRepository.getExamsByTeacherAndCourse(teacher_id, course_id);

            if(exams.length > 0) {
                return res.status(200).json({
                    message: "Danh sách đề thi theo giáo viên và môn học",
                    data: exams
                });
            }
            else {
                return res.status(404).json({
                    message: "Chức năng này chỉ có giáo viên mới có quyền!"
                })
            }
        } catch (err) {
            res.status(500).json({
                message: "Lỗi khi lấy danh sách đề thi!",
                error: err.message
            });
        }
    }


}
module.exports = ExamsController;