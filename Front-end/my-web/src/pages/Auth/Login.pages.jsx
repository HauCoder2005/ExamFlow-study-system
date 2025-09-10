import { useState } from "react";
import { Login } from "../../api/Auth.api";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";  // ✅ import Swal
import "./style/LoginForm.css";

const LoginUser = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingRegister, setLoadingRegister] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            console.log("--> Gửi login với:", email, password);
            const data = await Login(email, password);
            console.log("- Đăng nhập thành công:", data);
            localStorage.setItem("accessToken", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("role", data.user.roleMapping?.role_id);
            const userId = data.user.id;
            const role_id = data.user.roleMapping?.role_id;
            Swal.fire({
                icon: "success",
                title: "Đăng nhập thành công!",
                text: "Đang chuyển trang...",
                timer: 1500,
                showConfirmButton: false
            });

            setTimeout(() => {
                if (role_id === 1) {
                    navigate(`/teacher/${userId}`, { replace: true });
                } else if (role_id === 2) {
                    navigate(`/user/${userId}`, { replace: true });
                }
            }, 1500);

        } catch (err) {
            console.error("Lỗi đăng nhập:", err);
            Swal.fire({
                icon: "error",
                title: "Đăng nhập thất bại",
                text: "Vui lòng kiểm tra lại email hoặc mật khẩu!",
            });
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
        <div className="body">
            <div className="wrapper">
                <form onSubmit={handleLogin}>
                    <h1>Đăng nhập</h1>

                    {/* Email */}
                    <div className="input-box">
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <i className="material-icons">email</i>
                    </div>

                    {/* Mật khẩu */}
                    <div className="input-box">
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Password"
                        />
                        <i className="material-icons">lock</i>
                    </div>

                    <div className="Forgot-password">
                        <Link to="/forgot-password" className="text-decoration-none">Quên mật khẩu?</Link>
                    </div>

                    <button type="submit" className="btn-login" disabled={loading}>
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>

                    <div className="register">
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
        </div>
    );
};

export default LoginUser;
