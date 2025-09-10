import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useParams } from "react-router-dom";
import { createQuestions } from "../../../api/Exams.api";
import { getAllQuestionsByExam } from "../../../api/Question.api";

const CreateQuestionTeacher = () => {
    const [question, setQuestion] = useState({
        question_text: "",
        question_type: "",
        score: ""
    });
    const { exam_id } = useParams();
    const [options, setOptions] = useState([]);
    const [questionsList, setQuestionsList] = useState([]);
    console.log("Mã đề thi từ URL: ", exam_id);

    // handle input cho question
    const handleQuestionChange = (e) => {
        setQuestion({ ...question, [e.target.name]: e.target.value });
    };

    // lấy courseName từ sessionStorage
    const courseName = sessionStorage.getItem("course") || "Chưa có tên môn học";
    console.log("Tên môn học từ sessionStorage: ", courseName);

    // thêm option mới
    const addOption = () => {
        setOptions([...options, { option_text: "", is_correct: false }]);
    };
    const createQuestion = async (exam_id, question) => {
        try {
            console.log("📌 Tạo câu hỏi cho exam:", exam_id, question);
            const response = await createQuestions(exam_id, question);
            if (response) {
                console.log("✅ Câu hỏi đã được tạo:", response);
                return setQuestionsList([...questionsList, response]);
            }
        } catch (error) {
            console.error("Lỗi khi tạo câu hỏi:", error);
        }
    };
    const getAllQuestionByExams = async (exam_id) => {
        try {
            console.log("Id của bài thi đã lấy từ URL:", exam_id);
            const response = await getAllQuestionsByExam(exam_id);

            console.log("📌 Raw data từ API:", response);

            if (Array.isArray(response.examData)) {
                setQuestionsList(response.examData);
            } else {
                console.warn("⚠️ Dữ liệu trả về không phải array:", response);
            }
        }
        catch (error) {
            console.error("Lỗi khi lấy tất cả câu hỏi theo đề thi:", error);
        }
    };

    useEffect(() => {
        if (exam_id && question.question_text) {
            createQuestion(exam_id, question);
        }
        getAllQuestionByExams(exam_id);
        // eslint-disable-next-line
    }, [exam_id]);

    // thay đổi option
    const handleOptionChange = (index, field, value) => {
        const newOptions = [...options];
        newOptions[index][field] = value;
        setOptions(newOptions);
    };

    // lưu question + option
    const handleSave = async () => {
        if (!question.question_text) return alert("Vui lòng nhập question!");
        try {
            const created = await createQuestion(exam_id, { ...question, options });
            if (created) {
                setQuestionsList([...questionsList, created]);
                setQuestion({ question_text: "", question_type: "", score: "" });
                setOptions([]);
            }
        } catch (error) {
            console.error("Lỗi khi lưu câu hỏi:", error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="row">
                {/* Form bên trái */}
                <div className="col-md-5">
                    <div className="card p-3 shadow">
                        <h5>THÊM CÂU HỎI CHO MÔN {courseName.toUpperCase()}</h5>
                        <input
                            type="text"
                            name="question_text"
                            className="form-control my-2"
                            placeholder="Nội dung câu hỏi"
                            value={question.question_text}
                            onChange={handleQuestionChange}
                        />

                        {/* Chọn loại câu hỏi */}
                        <select
                            name="question_type"
                            className="form-control my-2"
                            value={question.question_type}
                            onChange={handleQuestionChange}
                        >
                            <option value="">-- Chọn loại câu hỏi --</option>
                            <option value="multiple_choice">Trắc nghiệm</option>
                            <option value="true_false">Đúng / Sai</option>
                            <option value="essay">Tự luận</option>
                        </select>

                        <input
                            type="number"
                            name="score"
                            className="form-control my-2"
                            placeholder="Điểm số"
                            value={question.score}
                            onChange={handleQuestionChange}
                        />

                        {/* Options chỉ hiển thị nếu không phải essay */}
                        {question.question_type !== "essay" && (
                            <>
                                <div className="d-flex align-items-center">
                                    <h6 className="me-2">Options:</h6>
                                    <i
                                        className="bi bi-plus-circle-fill text-primary"
                                        style={{ fontSize: "1.5rem", cursor: "pointer" }}
                                        onClick={addOption}
                                    ></i>
                                </div>

                                {options.map((opt, index) => (
                                    <div key={index} className="d-flex align-items-center my-2">
                                        <input
                                            type="text"
                                            className="form-control me-2"
                                            placeholder="Option text"
                                            value={opt.option_text}
                                            onChange={(e) =>
                                                handleOptionChange(index, "option_text", e.target.value)
                                            }
                                        />
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                checked={opt.is_correct}
                                                onChange={(e) =>
                                                    handleOptionChange(index, "is_correct", e.target.checked)
                                                }
                                            />
                                            <label className="form-check-label">Đúng</label>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}

                        <button className="btn btn-success mt-3" onClick={handleSave}>
                            Lưu Question
                        </button>
                    </div>
                </div>

                {/* Bảng bên phải */}
                <div className="col-md-7">
                    <h5>Danh sách Questions</h5>
                    <table className="table table-bordered mt-2">
                        <thead>
                            <tr>
                                <th>Question</th>
                                <th>Type</th>
                                <th>Score</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questionsList.length === 0 && (
                                <tr><td colSpan="4">Chưa có câu hỏi nào</td></tr>
                            )}
                            {questionsList.map((q, i) => (
                                <tr key={i}>
                                    <td>{q.question_text || "⚠️ Không có text"}</td>
                                    <td>{q.question_type}</td>
                                    <td>{q.score}</td>
                                    {/* <td>{JSON.stringify(q)}</td> */}
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default CreateQuestionTeacher;
