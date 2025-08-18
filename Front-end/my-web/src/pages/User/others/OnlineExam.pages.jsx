import { useEffect, useState } from "react";
import { getAllCourses } from "../../../api/Courses.api";
import "./style/OnlineExam.css";
import { Link } from "react-router-dom";

const OnlineExam = () => {
    const [courses, setCourses] = useState([]); // ✅ sửa từ "" thành []
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAllCourses = async () => {
            setLoading(true);
            try {
                const response = await getAllCourses();
                console.log("Dữ liệu môn học: ", response);
                setCourses(response);
                setError("");
            } catch (err) {
                console.error("❌ Lỗi khi lấy môn học:", err);
                setError("Không thể tải data!");
            } finally {
                setLoading(false);
            }
        };
        fetchAllCourses();
    }, []);

    if (loading) return <div className="text-center mt-5">Đang tải dữ liệu...</div>;
    if (error) return <div className="text-danger mt-5 text-center">{error}</div>;

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Danh sách môn học</h2>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {courses.map((course, index) => (
                    <div className="col" key={index}>
                        <div className="card h-100 shadow-sm hover-scale transition-transform">
                            <Link to={`/courses-detail/${course.id}`} className="no-underline">
                                <img
                                    src={`${course.img || 'default.jpg'}`}
                                    alt={course.name}
                                    className="card-img-top"
                                    style={{ height: "180px", objectFit: "cover" }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title name_course">{course.name}</h5>
                                    <p className="card-text">
                                        <strong>Mô tả:</strong> {course.description}
                                    </p>
                                    <p className="card-text">
                                        <strong>Giảng viên:</strong> {course.teacher_id || "Chưa có"}
                                    </p>
                                    <p className="card-text">
                                        <small>
                                            Ngày tạo:{" "}
                                            {new Date(course.created_at).toLocaleDateString()}
                                        </small>
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
};

export default OnlineExam;
