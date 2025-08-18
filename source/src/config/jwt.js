const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
module.exports = {
    jwtSecret: process.env.JWT_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    tokenExpireTime: '15m',
    refreshExpireTime: '7d'
}