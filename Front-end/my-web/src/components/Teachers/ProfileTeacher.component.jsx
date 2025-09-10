import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOneUsers, getAllStByTeacher } from "../../api/Users.api";
import "./style/ProfileTeacher.css";

const ProfileTeacher = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [students, setStudents] = useState([]);

    const getAllStudents = async () => {
        try {
            const studentsData = await getAllStByTeacher(id);
            setStudents(studentsData?.length ? studentsData : []);
        } catch {
            setError("Không thể tải danh sách sinh viên!");
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getOneUsers(id);
                userData?.length ? setUser(userData[0]) : setError("Không tìm thấy người dùng.");
            } catch {
                setError("Không thể tải thông tin người dùng!");
            }
        };
        fetchUser();
        getAllStudents();
    }, [id]);

    if (error) return <p className="text-danger">{error}</p>;
    if (!user) return <p>Đang tải dữ liệu người dùng...</p>;

    return (
        <div className="container mt-4">
            <div className="row g-4">
                {/* Thông tin giáo viên */}
                <div className="col-md-8">
                    <div className="teacher-card">
                        <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start">
                            <img
                                src={user.profile_image || "default.jpg"}
                                alt="Teacher"
                                className="teacher-avatar"
                            />
                            <div className="flex-grow-1 mt-3 mt-md-0 ms-md-3">
                                <h5 className="section-title">THÔNG TIN GIÁO VIÊN</h5>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Họ tên:</strong> {user.first_name} {user.last_name}</p>
                                <p><strong>Khóa học:</strong> 2023</p>
                            </div>
                        </div>
                        <Link
                            to={`/teacher/teacher-detail/${user.id}`}
                            className="btn btn-primary detail-btn"
                        >
                            Chi tiết
                        </Link>
                    </div>
                </div>

                {/* Danh sách sinh viên */}
                <div className="col-md-4">
                    <div className="student-card">
                        <h5 className="section-title">Danh Sách Sinh Viên</h5>
                        <div className="student-list">
                            {students.length > 0 ? (
                                students.slice(0, 3).map((student) => (
                                    <div key={student.id} className="student-item">
                                        <img
                                            src={student.profile_image || "https://via.placeholder.com/40"}
                                            alt={student.first_name}
                                            className="student-avatar"
                                        />
                                        <div>
                                            <div className="fw-semibold">
                                                {student.first_name} {student.last_name}
                                            </div>
                                            <small className="text-muted">{student.email}</small>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-muted">
                                    Không có sinh viên nào
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileTeacher;
