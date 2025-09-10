const bcrypt = require('bcrypt');
const { sendMail } = require('../../../utils/Mailer.utils');
const db = require("../../../config/config");
const { saveOtpEmail } = require("../../../services/Otp.services");

// Sửa lại cách generate OTP: 6 chữ số
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

exports.sendOtpEmail = (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Hệ thống chưa lấy được email!" });
    }

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) {
            console.error("Lỗi truy vấn:", err);
            return res.status(500).json({ message: "Lỗi máy chủ!" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Email không tồn tại trong cơ sở dữ liệu!" });
        }

        const otp = generateOTP();

        // Lưu OTP vào RAM hoặc nơi bạn quản lý
        saveOtpEmail(email, otp);

        try {
            await sendMail(email, 'Mã xác thực OTP!' ,`Đây là đoạn mã xác thực để đổi mật khẩu vui lòng không cung cấp mã này cho bất kì ai! Mã của bạn là: ${otp}`);
            return res.json({ message: 'OTP đã được gửi tới email của bạn' });
        } catch (emailError) {
            console.error("Lỗi gửi mail:", emailError);
            return res.status(500).json({ message: "Gửi OTP thất bại!" });
        }
    });
};
