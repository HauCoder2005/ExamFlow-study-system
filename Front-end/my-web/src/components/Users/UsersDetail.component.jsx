import { useEffect, useState } from "react";
import { editUserById, getOneUsers } from "../../api/Users.api";
import { useParams } from "react-router-dom";

const UserDetail = () => {
    const { id } = useParams();
    const [dataUser, setDataUser] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [formValues, setFormValues] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);

    const fetchUserData = async () => {
        try {
            const userApi = await getOneUsers(id);
            if (userApi && userApi[0]) {
                setDataUser(userApi[0]);
            } else {
                setDataUser(null);
                console.error("Không tìm thấy người dùng với ID:", id);
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu người dùng:", error);
            setDataUser(null);
        }
    };

    const editDataUser = async (userData) => {
        try {
            const updatedUser = await editUserById(id, userData);
            if (updatedUser) {
                console.log("Cập nhật người dùng thành công:", updatedUser);
                setShowEditForm(false);
                setShowSuccess(true);
                fetchUserData();
                setTimeout(() => setShowSuccess(false), 2000);
            } else {
                console.error("Không thể cập nhật người dùng.");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật người dùng:", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [id]);

    return (
        <>
            {dataUser ? (
                <div className={`container mt-4 p-4 bg-light rounded shadow ${showEditForm ? "blur-sm" : ""}`}>
                    <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
                        <h5 className="text-primary fw-bold mb-0">Thông tin học vấn</h5>
                        <button
                            className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"
                            onClick={() => {
                                setShowEditForm(true);
                                setFormValues(dataUser);
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                            </svg>
                        </button>
                    </div>

                    <div className="row">
                        <div className="col-md-4 d-flex justify-content-center align-items-start border-end">
                            <img
                                src={dataUser.profile_image || 'default.jpg'}
                                alt="Ảnh đại diện"
                                className="img-fluid rounded-circle border border-2"
                                style={{ width: "150px", height: "150px", objectFit: "cover" }}
                            />
                        </div>
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-4 mb-2">
                                    <p><strong>Họ tên:</strong><br />{dataUser.last_name} {dataUser.first_name}</p>
                                    <p><strong>Lớp:</strong><br />{dataUser.major}</p>
                                    <p><strong>Ngày sinh:</strong><br />{dataUser.date_of_birth}</p>
                                    <p><strong>Quê quán:</strong><br />{dataUser.place_of_birth}</p>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <p><strong>Bậc đào tạo:</strong><br />Trung Học Phổ Thông</p>
                                    <p><strong>Loại hình đào tạo:</strong><br />Chính quy</p>
                                    <p><strong>Trạng thái sinh viên:</strong><br />Đang học</p>
                                    <p><strong>Năm tốt nghiệp:</strong><br />{dataUser.graduation_year}</p>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <p><strong>Mã số sinh viên:</strong><br />{dataUser.id}</p>
                                    <p><strong>Khóa học:</strong><br />2023</p>
                                    <p><strong>Ngày nhập học:</strong><br />...</p>
                                    <p><strong>Email:</strong><br />{dataUser.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="container mt-4">Đang tải hoặc không tìm thấy người dùng...</div>
            )}

            {/* Modal chỉnh sửa */}
            {showEditForm && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 9999 }}>
                    <div className="bg-white p-4 rounded shadow" style={{ width: "500px" }}>
                        <h6 className="mb-3">Chỉnh sửa thông tin</h6>
                        <div className="row">
                            <div className="col-md-6 mb-2">
                                <label>Họ</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={formValues.last_name || ''}
                                    onChange={(e) => setFormValues({ ...formValues, last_name: e.target.value })}
                                />
                            </div>
                            <div className="col-md-6 mb-2">
                                <label>Tên</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={formValues.first_name || ''}
                                    onChange={(e) => setFormValues({ ...formValues, first_name: e.target.value })}
                                />
                            </div>
                            <div className="col-md-6 mb-2">
                                <label>Email</label>
                                <input
                                    className="form-control"
                                    type="email"
                                    value={formValues.email || ''}
                                    onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                                />
                            </div>
                            <div className="col-md-6 mb-2">
                                <label>Quê quán</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={formValues.place_of_birth || ''}
                                    onChange={(e) => setFormValues({ ...formValues, place_of_birth: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="mt-3 text-end">
                            <button className="btn btn-secondary me-2" onClick={() => setShowEditForm(false)}>Hủy</button>
                            <button className="btn btn-success" onClick={() => editDataUser(formValues)}>Lưu</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Thông báo thành công */}
            {showSuccess && (
                <div className="position-fixed top-0 end-0 m-4 p-3 bg-success text-white rounded shadow" style={{ zIndex: 9999 }}>
                    Cập nhật thông tin thành công!
                </div>
            )}
        </>
    );
};

export default UserDetail;
