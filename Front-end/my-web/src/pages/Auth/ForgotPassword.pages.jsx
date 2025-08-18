import { useState } from "react";
import { SendOtpEmail } from "../../api/Auth.api";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false); 
    const navigate = useNavigate();
    const handleButton = async(e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const data = await SendOtpEmail(email);
            console.log("Gửi mã OTP thành công!", data);
            setSuccess(true);
            setTimeout(() => {
                navigate("/verify-otp", { state: { email } });
            }, 1500);
            alert('Đã gửi mã OTP thành công!');
        }
        catch (err) {
            setError(err.toString());
        }
        finally {
            setLoading(false);
        }
    }
    return(
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <form
                onSubmit={handleButton}
                className="form-login p-4 shadow bg-white rounded"
                style={{ width: "400px" }}
            >
                <h3 className="text-center mb-4">QUÊN MẬT KHẨU</h3>
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
                <div style={{ paddingBottom: "10px" }}>
                    <Link to="/login" style={{ paddingBottom: "50px" }}>Bạn đã có tài khoản?</Link>
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? "Đang xác thực email..." : "Gửi OTP"}
                </button>
            </form>
        </div>
    )
}
export default ForgotPassword;