    import { useEffect, useState } from "react";
    import { Link, useParams } from "react-router-dom";
    import { getOneUsers, getAllStByTeacher } from "../../api/Users.api";

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
                <div className="row">
                    {/* Thông tin giáo viên */}
                    <div className="col-md-8 mb-4">
                        <div
                            className="card shadow-sm p-4 position-relative"
                            style={{
                                fontSize: "1.1rem",
                                height: "auto", // Tự co theo nội dung
                                maxHeight: "220px", // Giới hạn chiều cao
                            }}
                        >
                            <div className="d-flex align-items-start">
                                <img
                                    src={user.profile_image || "default.jpg"}
                                    alt="Teacher"
                                    className="rounded"
                                    style={{ height: "120px", marginRight: "20px" }}
                                />
                                <div className="flex-grow-1">
                                    <h5 className="mb-3 fw-bold" style={{ fontSize: "1.4rem" }}>
                                        THÔNG TIN GIÁO VIÊN
                                    </h5>
                                    <p><strong>Email:</strong> {user.email}</p>
                                    <p><strong>Họ tên:</strong> {user.first_name} {user.last_name}</p>
                                    <p><strong>Khóa học:</strong> 2023</p>
                                </div>
                            </div>
                            <Link
                                to={`/user-detail/${user.id}`}
                                className="btn btn-primary position-absolute"
                                style={{ bottom: "16px", right: "16px" }}
                            >
                                Chi tiết
                            </Link>
                        </div>
                    </div>

                    {/* Danh sách sinh viên */}
                    <div className="col-md-4 mb-4">
                        <div
                            className="card shadow-sm p-4"
                            style={{
                                fontSize: "1.05rem",
                                height: "auto",
                                maxHeight: "220px", // Giới hạn chiều cao
                            }}
                        >
                            <h5 className="fw-bold mb-3" style={{ fontSize: "1.3rem" }}>
                                Danh Sách Sinh Viên
                            </h5>
                            <div style={{ overflowY: "auto" }}>
                                {students.length > 0 ? (
                                    students.slice(0, 3).map((student) => ( // Giới hạn 3 sinh viên
                                        <div
                                            key={student.id}
                                            className="d-flex align-items-center border-bottom py-2"
                                        >
                                            <img
                                                src={student.profile_image || "https://via.placeholder.com/40"}
                                                alt={student.first_name}
                                                className="rounded-circle me-2"
                                                width="40"
                                                height="40"
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
