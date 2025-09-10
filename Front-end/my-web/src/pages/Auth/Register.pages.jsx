import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../api/Auth.api";
import Swal from "sweetalert2";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false); 
    const navigate = useNavigate();

    const handleRegister = async(e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const data = await RegisterUser(firstName, lastName, email, password);
            console.log("Đăng ký thành công!", data);
            setSuccess(true);
            if (data) {
                Swal.fire({
                    icon: "success",
                    title: "Đăng ký thành công!",
                    text: "Đang chuyển trang...",
                    timer: 1500,
                    showConfirmButton: false
                });
            }
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        }
        catch(err) {
            setError(err.toString());
        }
        finally {
            setLoading(false); 
        }
    }
    return(
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <form
                onSubmit={handleRegister}
                className="form-login p-4 shadow bg-white rounded"
                style={{ width: "400px" }}
            >
                <h3 className="text-center mb-4">ĐĂNG KÝ</h3>
                
                <div className="mb-3 row">
                    <label htmlFor="firstName" className="col-sm-3 col-form-label">
                        Họ: 
                    </label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="lastName" className="col-sm-3 col-form-label">
                        Tên:
                    </label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="mb-3 row">
                    <label htmlFor="email" className="col-sm-3 col-form-label">
                        Email
                    </label>
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
                    <label htmlFor="password" className="col-sm-3 col-form-label">
                        Mật khẩu
                    </label>
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

                <a> 
                    <Link to="/login">Bạn đã có tài khoản?</Link>
                </a>

                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? "Đang đăng ký..." : "Đăng Ký"}
                </button>

                {error && <p className="text-danger mt-3 text-center">{error}</p>}
                {/* {success && (
                    <p className="text-success mt-3 text-center">
                        Đăng ký thành công! Đang chuyển trang...
                    </p>
                )} */}

            </form>
        </div>
    )
}
export default Register;