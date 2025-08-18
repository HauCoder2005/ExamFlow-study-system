const jwt = require("jsonwebtoken");
const config = require("../config/jwt");

exports.generateToken = (user) => {
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
