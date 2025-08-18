import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneCoursesByIds } from "../../../api/Courses.api";
import 'bootstrap/dist/css/bootstrap.min.css';

const CoursesDetailTeacher = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeForm, setActiveForm] = useState("tracnghiem"); // mặc định là trắc nghiệm


    useEffect(() => {
        const fetchCourse = async () => {
            setLoading(true);
            try {
                console.log("🟡 Gửi request với id:", id);
                const response = await getOneCoursesByIds(id);
                console.log("🟢 Dữ liệu nhận được:", response);

                if (response) {
                    setCourse(response[0]);
                } else {
                    setError("Không tìm thấy môn học.");
                }
                console.log(response)
            } catch (err) {
                console.error("❌ Lỗi khi gọi API:", err);
                setError("Không thể tải thông tin môn học!");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCourse();
        } else {
            setError("ID không hợp lệ.");
            setLoading(false);
        }
    }, [id]);

    if (loading) return <div className="text-center mt-4">⏳ Đang tải...</div>;
    if (error) return <div className="alert alert-danger mt-4">{error}</div>;
    if (!course) return <div className="mt-4">Không có dữ liệu hợp lệ.</div>;

    return (
        <>
            <div className="container mt-5">
                <div
                    className="card"
                    style={{
                        maxWidth: "1200px",
                        margin: "0 auto",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        borderRadius: "12px",
                        overflow: "hidden",
                    }}
                >
                    {course.img && (
                        <img
                            src={course.img}
                            alt={course.name}
                            style={{
                                height: "320px",
                                width: "100%",
                                objectFit: "cover",
                            }}
                        />
                    )}
                    <div className="card-body text-center p-4">
                        <h2 className="card-title mb-3">{course.name}</h2>
                        <p className="card-text mb-0">
                            <strong>Mô tả:</strong> {course.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Nút chọn hình thức thi */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                    marginTop: "30px",
                    flexWrap: "wrap",
                }}
            >
                <button
                    className={`btn ${activeForm === "tracnghiem" ? "btn-primary" : "btn-outline-primary"}`}
                    style={{ minWidth: "180px", height: "45px", fontSize: "16px" }}
                    onClick={() => setActiveForm("tracnghiem")}
                >
                    Trắc Nghiệm
                </button>

                <button
                    className={`btn ${activeForm === "tuluan" ? "btn-primary" : "btn-outline-primary"}`}
                    style={{ minWidth: "180px", height: "45px", fontSize: "16px" }}
                    onClick={() => setActiveForm("tuluan")}
                >
                    Tự Luận
                </button>

            </div>

            <div className="container mt-4">
                <div
                    className="card"
                    style={{
                        maxWidth: "900px",
                        margin: "0 auto",
                        padding: "20px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        borderRadius: "12px",
                    }}
                >
                    {activeForm === "tracnghiem" && (
                        <>
                            <h4 className="mb-3">Thêm câu hỏi trắc nghiệm</h4>
                            <div className="mb-3">
                                <label className="form-label">Câu hỏi</label>
                                <input type="text" className="form-control" placeholder="Nhập câu hỏi..." />
                            </div>
                            {["A", "B", "C", "D"].map((opt) => (
                                <div className="mb-3" key={opt}>
                                    <label className="form-label">Đáp án {opt}</label>
                                    <input type="text" className="form-control" />
                                </div>
                            ))}
                            <button className="btn btn-success">Lưu câu hỏi</button>
                        </>
                    )}

                    {activeForm === "tuluan" && (
                        <>
                            <h4 className="mb-3">Thêm câu hỏi tự luận</h4>
                            <div className="mb-3">
                                <label className="form-label">Câu hỏi</label>
                                <textarea className="form-control" rows="4" placeholder="Nhập câu hỏi..."></textarea>
                            </div>
                            <button className="btn btn-success">Lưu câu hỏi</button>
                        </>
                    )}
                </div>
            </div>

        </>


    );
};

export default CoursesDetailTeacher;
