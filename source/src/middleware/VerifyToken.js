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
            role_id: user.roleMapping.role_id,

        },
        config.jwtSecret, // secret là string
        {
            expiresIn: config.tokenExpireTime || '24h'
        }
    );
};
