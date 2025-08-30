import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneCoursesByIds } from "../../../api/Courses.api";
import { createExams, getAllExamsByCourse } from "../../../api/Exams.api";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

const CoursesDetailTeacher = () => {
    const { id } = useParams(); // id = course_id
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [exams, setExams] = useState([]); // ✅ danh sách đề thi

    const [formData, setFormData] = useState({
        title: "",
        type: "multiple_choice",
        time_limit: 60,
        total_score: 10,
        status: 1,
    });

    // Lấy thông tin môn học
    useEffect(() => {
        const fetchCourse = async () => {
            setLoading(true);
            try {
                const response = await getOneCoursesByIds(id);
                if (response) {
                    setCourse(response[0]);
                } else {
                    setError("Không tìm thấy môn học.");
                }
            } catch (err) {
                setError("Không thể tải thông tin môn học!");
            } finally {
                setLoading(false);
            }
        };

        const fetchExams = async () => {
            try {
                const data = await getAllExamsByCourse(id);
                setExams(data.data || []); // backend trả về { message, data }
            } catch (err) {
                console.error("Lỗi khi lấy đề thi", err);
            }
        };

        if (id) {
            fetchCourse();
            fetchExams();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "time_limit" || name === "total_score" || name === "status"
                    ? Number(value)
                    : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await createExams(id, formData);

            Swal.fire({
                icon: "success",
                title: "Thành công!",
                text: res.message || "Tạo đề thi thành công!",
                showConfirmButton: false,
                timer: 2000,
            });

            // Reset form
            setFormData({
                title: "",
                type: "multiple_choice",
                time_limit: 60,
                total_score: 10,
                status: 1,
            });

            // ✅ gọi lại API để load danh sách exam mới
            const data = await getAllExamsByCourse(id);
            setExams(data.data || []);
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Lỗi!",
                text: err.response?.data?.message || "Không thể tạo đề thi!",
            });
        }
    };

    if (loading) return <div className="text-center mt-4">Đang tải...</div>;
    if (error) return <div className="alert alert-danger mt-4">{error}</div>;
    if (!course) return <div className="mt-4">Không có dữ liệu hợp lệ.</div>;

    return (
        <div className="container mt-4">
            <h3 className="mb-3 text-primary fw-bold">
                TẠO ĐỀ THI MÔN {course.name.toUpperCase()}
            </h3>

            {/* Form tạo đề thi */}
            <form onSubmit={handleSubmit} className="card p-4 shadow-lg border-0 mb-4">
                <div className="mb-3">
                    <label className="form-label fw-semibold">Tên đề thi</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Nhập tên đề thi..."
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Loại đề thi</label>
                    <select
                        name="type"
                        className="form-select"
                        value={formData.type}
                        onChange={handleChange}
                    >
                        <option value="multiple_choice">Trắc nghiệm</option>
                        <option value="essay">Tự luận</option>
                        <option value="mixed">Kết hợp</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Thời gian (phút)</label>
                    <input
                        type="number"
                        name="time_limit"
                        className="form-control"
                        value={formData.time_limit}
                        onChange={handleChange}
                        min="10"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Tổng điểm</label>
                    <input
                        type="number"
                        name="total_score"
                        className="form-control"
                        value={formData.total_score}
                        onChange={handleChange}
                        min="1"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Trạng thái</label>
                    <select
                        name="status"
                        className="form-select"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value={1}>Hoạt động</option>
                        <option value={0}>Nháp</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary fw-semibold px-4">
                    + Tạo đề thi
                </button>
            </form>

            {/* Danh sách đề thi */}
            <div className="mt-4">
                <h4 className="fw-bold mb-3">Danh sách đề thi</h4>
                {exams.length === 0 ? (
                    <p className="text-muted">Chưa có đề thi nào</p>
                ) : (
                    <div
                        style={{
                            maxHeight: "400px",
                            overflowY: "auto",
                            border: "1px solid #ddd",
                            borderRadius: "12px",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                        }}
                    >
                        <table className="table table-hover mb-0">
                            <thead
                                className="table-primary"
                                style={{ position: "sticky", top: 0, zIndex: 1 }}
                            >
                                <tr>
                                    <th style={{ width: "50px" }}>#</th>
                                    <th>Tên đề thi</th>
                                    <th>Loại</th>
                                    <th>Thời gian</th>
                                    <th>Tổng điểm</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {exams.map((exam, index) => (
                                    <tr key={exam.id}>
                                        <td>{index + 1}</td>
                                        <td className="fw-semibold">{exam.exam_title}</td>
                                        <td>
                                            {exam.exam_type === "multiple_choice"
                                                ? "Trắc nghiệm"
                                                : exam.exam_type === "essay"
                                                    ? "Tự luận"
                                                    : exam.exam_type === "mixed"
                                                        ? "Kết hợp"
                                                        : "Không xác định"}
                                        </td>
                                        <td>{exam.time_limit} phút</td>
                                        <td>{exam.total_score}</td>
                                        <td>
                                            <span
                                                className={`badge ${exam.status === 1
                                                        ? "bg-success"
                                                        : "bg-secondary"
                                                    }`}
                                            >
                                                {exam.status === 1 ? "Hoạt động" : "Nháp"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoursesDetailTeacher;
