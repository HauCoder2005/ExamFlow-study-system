const jwt = require("jsonwebtoken");
const config = require("../config/jwt");

exports.generateToken = (user) => {
    if(!user) {
        throw  new Error("Không lấy được user do tài khoản và mật khẩu sai");
    }
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
        },
        config.jwtSecret, // secret là string
        {
            expiresIn: config.tokenExpireTime || '1h'
        }
    );
};
