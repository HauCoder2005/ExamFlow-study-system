const jwt = require("jsonwebtoken");
const config = require("../config/jwt");

module.exports = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) {
            return res
                .status(403)
                .json({ message: "Bạn phải đăng nhập vào mới sử dụng được chức năng này!" });
        }
        req.user = decoded;
        console.log("Decoded JWT:", req.user); // 👈 thêm dòng này

        if (req.user.role_id !== 1) {
            return res
                .status(403)
                .json({ message: "Chỉ giáo viên mới được phép sử dụng chức năng này!" });
        }
        next();
    });
};
