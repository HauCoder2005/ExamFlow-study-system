import { useEffect, useState } from "react";
import "./style/OnlineExamTeacher.css";
import { getAllCourses } from "../../../api/Courses.api";
import { Link } from "react-router-dom";
const OnlineExamTeacher = () => {
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchDataCourses = async () => {
        try {
            const response = await getAllCourses();
            console.log("Dữ liệu môn học: ", response);
            setCourses(response);
        }
        catch (error) {
            console.error("Lỗi khi lấy dữ liệu môn học:", error);
        }
    };
    useEffect(() => {
        fetchDataCourses();
    }, [])
    const removeVietnameseTones = (str) => {
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D");
    };
    return (
        <>
            {/* Tiêu đề */}
            <div className="list-exam container d-flex align-items-center gap-2">
                <i className="bi bi-book fs-3"></i>
                <h3 className="name-item mb-0">Danh Sách Môn Học</h3>
            </div>

            <div className="container mt-2 d-flex justify-content-end">
                <div
                    className="input-group input-group-sm"
                    style={{
                        width: "250px", 
                        flexShrink: 0,
                        flexWrap: "nowrap"
                    }}
                >
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tìm kiếm..."
                        style={{
                            height: "28px",
                            fontSize: "0.85rem",
                            flex: "1 1 auto" // input luôn chiếm phần còn lại
                        }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        className="btn btn-primary p-0 px-2"
                        style={{ height: "28px" }}
                        type="button"
                    >
                        <i
                            className="bi bi-search"
                            style={{ fontSize: "14px", lineHeight: "1" }}
                        ></i>
                    </button>
                </div>
            </div>

            {/* Danh sách môn học */}
            <div
                className="container mt-4 always-scroll"
                style={{
                    border: "2px solid #ccc",
                    borderRadius: "8px",
                    padding: "20px",
                    maxHeight: "500px",
                    minHeight: "500px"
                }}
            >

                {courses.length > 0 ? (
                    courses
                        .filter((course) => {
                            const nameNoTone = removeVietnameseTones(course.name).toLowerCase();
                            const searchNoTone = removeVietnameseTones(searchTerm).toLowerCase();
                            return nameNoTone.includes(searchNoTone);
                        })
                        .map((course, index) => (
                            <div className="card mb-3" key={index}>
                                <div className="card-body d-flex align-items-center gap-3">
                                    {/* Ảnh bên trái */}
                                    <img
                                        src={`${course.img || 'default.jpg'}`}
                                        alt={course.name}
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            objectFit: "cover",
                                            borderRadius: "8px"
                                        }}
                                    />

                                    {/* Nội dung tiêu đề và mô tả */}
                                    <div>
                                        <h5 className="card-title mb-1">{course.name}</h5>
                                        <p className="card-text mb-0">{course.description}</p>
                                    </div>

                                    {/* Nút dấu + */}
                                    <button
                                        className="btn btn-primary btn-sm ms-auto p-1"
                                        style={{ width: "120px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}
                                    >
                                        <Link to={`/teacher/courses-detail/${course.id}`}>
                                            <i className="bi bi-plus-lg" style={{ fontSize: "12px", color: "white", fontFamily: "monospace", fontWeight: "normal" }}>Tạo bài thi</i>
                                        </Link>
                                    </button>

                                </div>
                            </div>
                        ))
                ) : (
                    <p className="text-center">Không có môn học nào.</p>
                )}


            </div>

        </>



    );
}
export default OnlineExamTeacher;