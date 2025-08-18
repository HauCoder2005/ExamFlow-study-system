import { useState } from "react";
import { Login } from "../../api/Auth.api";
import { useNavigate, Link } from "react-router-dom";

const LoginUser = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingRegister, setLoadingRegister] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            console.log("--> Gửi login với:", email, password);

            const data = await Login(email, password);
            console.log("- Đăng nhập thành công:", data);

            // ✅ Lưu token, user và role vào localStorage
            localStorage.setItem("accessToken", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("role", data.user.roleMapping?.role_id);

            const userId = data.user.id;
            const role_id = data.user.roleMapping?.role_id;

            setSuccess(true);
            setTimeout(() => {
                if (role_id === 1) {
                    navigate(`/teacher/${userId}`, { replace: true });
                } else if (role_id === 2) {
                    navigate(`/user/${userId}`, { replace: true });
                }
            }, 1000);
        } catch (err) {
            console.error("❌ Lỗi đăng nhập:", err);
            setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
        } finally {
            setLoading(false);
        }
    };

    const handleClickRegister = () => {
        setLoadingRegister(true);
        setTimeout(() => {
            navigate("/register");
        }, 1000);
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <form
                onSubmit={handleLogin}
                className="form-login p-4 shadow bg-white rounded"
                style={{ width: "400px" }}
            >
                <h3 className="text-center mb-4">Đăng nhập</h3>

                {/* Email */}
                <div className="mb-3 row">
                    <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                    <div className="col-sm-9">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Mật khẩu */}
                <div className="mb-3 row">
                    <label htmlFor="password" className="col-sm-3 col-form-label">Mật khẩu</label>
                    <div className="col-sm-9">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="text-end mb-2">
                    <Link to="/forgot-password" className="text-decoration-none">Quên mật khẩu?</Link>
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>

                {error && <p className="text-danger mt-3 text-center">{error}</p>}
                {success && (
                    <p className="text-success mt-3 text-center">
                        ✅ Đăng nhập thành công! Đang chuyển trang...
                    </p>
                )}

                <div className="text-center mt-3">
                    <span>Bạn chưa có tài khoản? </span>
                    <button
                        onClick={handleClickRegister}
                        className="btn btn-link p-0 m-0 align-baseline"
                        disabled={loadingRegister}
                    >
                        {loadingRegister ? "Đang chuyển hướng..." : "Đăng ký ngay"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginUser;
