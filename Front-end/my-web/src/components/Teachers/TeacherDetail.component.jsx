import { useEffect, useState } from "react";
import { editUserById, getOneUsers } from "../../api/Users.api";
import { useParams } from "react-router-dom";

const TeacherDetail = () => {
    const { id } = useParams();
    const [dataUser, setDataUser] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [formValues, setFormValues] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    // Chuyển ngày sinh từ DB/ISO sang YYYY-MM-DD cho input
    const formatDateForInput = (isoDate) => {
        if (!isoDate) return "";
        const d = new Date(isoDate);
        const offset = d.getTimezoneOffset() * 60000;
        const localDate = new Date(d.getTime() - offset);
        return localDate.toISOString().slice(0, 10);
    };

    const formatDateForTable = (isoDate) => {
        if (!isoDate) return "";
        const d = new Date(isoDate);
        return d.toLocaleDateString("vi-VN");
    };

    const fetchUserData = async () => {
        try {
            const userApi = await getOneUsers(id);
            if (userApi && userApi[0]) {
                const userData = userApi[0];

                setDataUser(userData);

                // Luôn set previewImage = ảnh hiện tại
                setPreviewImage(userData.profile_image || null);

                setFormValues({
                    ...userData,
                    date_of_birth_for_input: formatDateForInput(userData.date_of_birth),
                });
            } else {
                setDataUser(null);
                console.error("Không tìm thấy người dùng với ID:", id);
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu người dùng:", error);
            setDataUser(null);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const previewUrl = URL.createObjectURL(file);
            setPreviewImage(previewUrl);

            // cập nhật luôn preview ảnh trong phần thông tin chính
            setDataUser((prev) => ({
                ...prev,
                profile_image: previewUrl,
            }));
        }
    };
    
    const editDataUser = async () => {
        try {
            const formData = new FormData();
            formData.append("last_name", formValues.last_name || "");
            formData.append("first_name", formValues.first_name || "");
            formData.append("email", formValues.email || "");
            formData.append("place_of_birth", formValues.place_of_birth || "");
            if (formValues.date_of_birth_for_input) {
                formData.append("date_of_birth", formValues.date_of_birth_for_input);
            }
            if (selectedFile) {
                formData.append("profile_image", selectedFile);
            }

            const updatedUser = await editUserById(id, formData);

            if (updatedUser) {
                // Cập nhật dataUser bằng dữ liệu trả về từ backend
                setDataUser((prev) => ({
                    ...prev,
                    ...formValues,
                    profile_image: updatedUser.profile_image
                        ? `${updatedUser.profile_image}?t=${Date.now()}`
                        : prev.profile_image,
                    date_of_birth: formValues.date_of_birth_for_input || prev.date_of_birth,
                }));

                // reset selectedFile và previewImage
                setSelectedFile(null);
                setPreviewImage(updatedUser.profile_image ? `${updatedUser.profile_image}?t=${Date.now()}` : null);

                setShowEditForm(false);
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 2000);
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
                <div className="container mt-4 p-4 bg-light rounded shadow">
                    <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
                        <h5 className="text-primary fw-bold mb-0">Thông tin học vấn</h5>
                        <button
                            className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"
                            onClick={() => setShowEditForm(true)}
                        >
                            <i className="bi bi-pencil-square" style={{ fontSize: "20px" }}></i> Chỉnh Sửa
                        </button>
                    </div>

                    <div className="row">
                        <div className="col-md-4 d-flex justify-content-center align-items-start border-end">
                            <img
                                key={dataUser?.profile_image}
                                src={dataUser?.profile_image || '/fallback-avatar.png'}
                                alt="Ảnh đại diện"
                                className="img-fluid rounded-circle border border-2"
                                style={{ width: 150, height: 150, objectFit: 'cover' }}
                            />
                        </div>
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-4 mb-2">
                                    <p><strong>Họ tên:</strong><br />{dataUser.first_name} {dataUser.last_name}</p>
                                    <p><strong>Chủ nhiệm lớp:</strong><br />{dataUser.major}</p>
                                    <p><strong>Ngày sinh:</strong><br />{formatDateForTable(dataUser.date_of_birth)}</p>
                                    <p><strong>Quê quán:</strong><br />{dataUser.place_of_birth}</p>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <p><strong>Bậc đào tạo:</strong><br />Trung Học Phổ Thông</p>
                                    <p><strong>Loại hình đào tạo:</strong><br />Chính quy</p>
                                    <p><strong>Trạng thái:</strong><br />Đang là giáo viên</p>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <p><strong>Mã số giáo viên:</strong><br />{dataUser.id}</p>
                                    <p><strong>Email:</strong><br />{dataUser.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="container mt-4">Đang tải hoặc không tìm thấy người dùng...</div>
            )}

            {showEditForm && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 9999 }}>
                    <div className="bg-white p-4 rounded shadow" style={{ width: "500px" }}>
                        <h6 className="mb-3">Chỉnh sửa thông tin</h6>
                        <div className="row">
                            <div className="col-md-6 mb-2">
                                <label>Họ</label>
                                <input className="form-control" type="text"
                                    value={formValues.last_name || ""}
                                    onChange={(e) => setFormValues({ ...formValues, last_name: e.target.value })} />
                            </div>
                            <div className="col-md-6 mb-2">
                                <label>Tên</label>
                                <input className="form-control" type="text"
                                    value={formValues.first_name || ""}
                                    onChange={(e) => setFormValues({ ...formValues, first_name: e.target.value })} />
                            </div>
                            <div className="col-md-6 mb-2">
                                <label>Email</label>
                                <input className="form-control" type="email"
                                    value={formValues.email || ""}
                                    onChange={(e) => setFormValues({ ...formValues, email: e.target.value })} />
                            </div>
                            <div className="col-md-6 mb-2">
                                <label>Quê quán</label>
                                <input className="form-control" type="text"
                                    value={formValues.place_of_birth || ""}
                                    onChange={(e) => setFormValues({ ...formValues, place_of_birth: e.target.value })} />
                            </div>
                            <div className="col-md-6 mb-2">
                                <label>Ngày sinh</label>
                                <input className="form-control" type="date"
                                    value={formValues.date_of_birth_for_input || ""}
                                    onChange={(e) => setFormValues({ ...formValues, date_of_birth_for_input: e.target.value })} />
                            </div>
                            <div className="col-md-12 mb-2">
                                <label>Ảnh đại diện</label>
                                <input type="file" accept="image/*" className="form-control" onChange={handleFileChange} />
                                {previewImage && (
                                    <div className="mt-2 text-center">
                                        <img src={previewImage} alt="Preview"
                                            className="rounded-circle border"
                                            style={{ width: "80px", height: "80px", objectFit: "cover" }} />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mt-3 text-end">
                            <button className="btn btn-secondary me-2" onClick={() => setShowEditForm(false)}>Hủy</button>
                            <button className="btn btn-success" onClick={editDataUser}>Lưu</button>
                        </div>
                    </div>
                </div>
            )}

            {showSuccess && (
                <div className="position-fixed top-0 end-0 m-4 p-3 bg-success text-white rounded shadow" style={{ zIndex: 9999 }}>
                    Cập nhật thông tin thành công!
                </div>
            )}
        </>
    );
};

export default TeacherDetail;
