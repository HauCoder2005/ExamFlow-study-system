const db = require('../../../config/config');
const bcrypt = require('bcrypt');

exports.ChangePassword = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email hoặc mật khẩu không hợp lệ!" });
    }

    try {
        // Mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Dùng .promise().query để đảm bảo trả về Promise
        const sql = "UPDATE users SET password = ? WHERE email = ?";
        const [result] = await db.promise().query(sql, [hashedPassword, email]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Không tìm thấy người dùng với email này!" });
        }

        res.status(200).json({ message: "Đổi mật khẩu thành công!" });
    } catch (error) {
        console.error("ChangePassword Error:", error);
        res.status(500).json({ message: "Lỗi máy chủ khi đổi mật khẩu!" });
    }
};
