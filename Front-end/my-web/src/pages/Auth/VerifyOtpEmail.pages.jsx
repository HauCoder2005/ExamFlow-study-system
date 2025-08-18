import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { VerifyOtpEmailApi } from "../../api/Auth.api";

const VerifyOtpEmail = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [email, setEmail] = useState(location.state?.email || "");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const ButtonVerifyOtpEmail = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const data = await VerifyOtpEmailApi(email, otp);
            console.log("Xác thực OTP thành công!", data);
            setSuccess(true);
            setTimeout(() => {
                navigate("/change-password", { state: { email } });
            }, 1500);
            alert("Đã xác thực thành công!");
        } catch (err) {
            setError(err.toString());
        } finally {
            setLoading(false);
        }
    };

    if (!email) {
        return (
            <div style={{ padding: "20px", color: "red" }}>
                Không có email để xác thực. Vui lòng quay lại trang trước.
            </div>
        );
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <form onSubmit={ButtonVerifyOtpEmail} className="form-login p-4 shadow bg-white rounded"
                style={{ width: "400px" }}>
                <h3>Xác thực OTP</h3>
                <p>Email: <strong>{email}</strong></p>

                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Nhập mã OTP"
                    required
                    style={{ marginBottom: "10px" }}
                />
                <br />
                <button type="submit" disabled={loading}>
                    {loading ? "Đang xác thực..." : "Xác thực OTP"}
                </button>

                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>Xác thực thành công!</p>}
            </form>
        </div>
    );
};

export default VerifyOtpEmail;
