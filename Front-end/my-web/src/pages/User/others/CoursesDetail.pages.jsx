import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneCoursesByIds } from "../../../api/Courses.api";
import 'bootstrap/dist/css/bootstrap.min.css';

const CoursesDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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
                console.error("-> Lỗi khi gọi API:", err);
                setError("Không thể tải thông tin môn học!");
            } finally {
                setLoading(false);
            }
        };
        const getAllExams = async () => {

        }
        if (id) {
            fetchCourse();
            getAllExams();
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
                            borderTopLeftRadius: "12px",
                            borderTopRightRadius: "12px",
                        }}
                    />
                )}
                <div className="card-body text-center">
                    <h2 className="card-title">{course.name}</h2>
                    
                    <p className="card-text">
                        <strong>Mô tả:</strong> {course.description}
                    </p>
                </div>
            </div>
        </div>
        <div className="container mt-5">
                <div className="card" style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "20px 20px 20px 20px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    borderRadius: "12px",
                }}>
                    Tất cả các bài kiểm tra
            </div>
        </div>
        </>
    );
};

export default CoursesDetail;
