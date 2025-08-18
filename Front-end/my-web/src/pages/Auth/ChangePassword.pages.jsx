import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChangePasswords } from "../../api/Auth.api";

const ChangePassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || "";

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email) {
            setError("Không có email xác định.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Mật khẩu không khớp.");
            return;
        }

        setLoading(true);
        try {
            await ChangePasswords(email, password);
            setSuccess(true);
            alert("Đổi mật khẩu thành công!");
            navigate("/login");
        } catch (err) {
            setError("Đổi mật khẩu thất bại: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <form onSubmit={handleSubmit} className="form-login p-4 shadow bg-white rounded" style={{ width: "400px" }}>
                <h3>Đổi mật khẩu</h3>
                <p>Email: <strong>{email}</strong></p>

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mật khẩu mới"
                    required
                    style={{ marginBottom: "10px" }}
                />
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Xác nhận mật khẩu"
                    required
                    style={{ marginBottom: "10px" }}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
                </button>

                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>Thành công!</p>}
            </form>
        </div>
    );
};

export default ChangePassword;
