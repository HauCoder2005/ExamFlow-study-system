const { verifyOtpEmail } = require("../../../services/Otp.services");

exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: "Vui lòng cung cấp email và mã OTP" });
    }

    const isValid = verifyOtpEmail(email, otp);

    if (!isValid) {
        return res.status(400).json({ message: "Mã OTP không hợp lệ hoặc đã hết hạn" });
    }

    res.json({ message: "Xác thực OTP thành công" });
};
