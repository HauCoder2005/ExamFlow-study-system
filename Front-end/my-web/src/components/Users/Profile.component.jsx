import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOneUsers } from "../../api/Users.api";

const Profile = () => {
    const { id } = useParams(); 
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getOneUsers(id); 
                if (userData) {
                    setUser(userData[0]);
                } else {
                    setError("Không tìm thấy người dùng.");
                }
            } catch (err) {
                console.error("Lỗi khi fetch user:", err);
                setError("Không thể tải thông tin người dùng!");
            }
        };

        fetchUser();
    }, [id]);

    if (error) return <p className="text-danger">{error}</p>;
    if (!user) return <p>Đang tải dữ liệu người dùng...</p>;

    return (

        <div className="container mt-4">
            <div className="row">
                <div className="col-md-8 mb-4">
                    <div className="card shadow-sm p-4 position-relative pb-5" style={{ minHeight: "100px" }}>
                        <div className="d-flex flex-row align-items-start">
                            <img
                                src={`${user.profile_image || 'default.jpg'}`}
                                alt="Student"
                                className="rounded"
                                style={{ height: "150px", marginRight: "20px" }}
                            />
                            <div className="flex-grow-1">
                                <h5 className="mb-3 fw-bold">Thông tin sinh viên</h5>
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
                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm p-4">
                        <h5 className="fw-bold mb-3">Lịch theo tháng</h5>
                        <input type="month" className="form-control mb-3" defaultValue="2025-06" />
                        <div className="text-center text-muted">📅 Hiển thị lịch ở đây</div>
                    </div>
                </div>
            </div>

            <div className="row">
                {/* Nhắc nhở */}
                <div className="col-md-6 mb-4">
                    <div className="card shadow-sm p-4 d-flex justify-content-between">
                        <div>
                            <h6 className="fw-bold">Nhắc nhở</h6>
                            <p className="display-4 fw-bold text-primary">0</p>
                        </div>
                        <div className="align-self-end">
                            <a href="#" className="text-danger">Xem chi tiết</a>
                        </div>
                    </div>
                </div>

                {/* Lịch học trong tuần */}
                <div className="col-md-6 mb-4">
                    <div className="card shadow-sm p-4 d-flex justify-content-between">
                        <div>
                            <h6 className="fw-bold">Lịch học trong tuần</h6>
                            <p className="display-4 fw-bold text-success">1</p>
                        </div>
                        <div className="align-self-end">
                            <a href="#" className="text-primary">Xem chi tiết</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Các ô chức năng */}
            <div className="row row-cols-2 row-cols-md-4 g-3 mb-5">
                {[
                    { icon: "📶", title: "Đào tạo trực tuyến" },
                    { icon: "🎧", title: "Hỗ trợ trực tuyến" },
                    { icon: "🏦", title: "Thanh toán trực tuyến" },
                    { icon: "🎓", title: "Chương trình học" },
                    { icon: "📊", title: "Kết quả học tập" },
                    { icon: "🗓️", title: "Đăng ký học" },
                    { icon: "📅", title: "Đăng ký môn học" },
                    { icon: "⭐", title: "Đánh giá học phần" },
                ].map((item, idx) => (
                    <div key={idx} className="col">
                        <div className="card text-center shadow-sm p-3 h-100">
                            <div className="fs-2">{item.icon}</div>
                            <p className="mt-2">{item.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default Profile;


