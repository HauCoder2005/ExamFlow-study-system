const config = require('../config/config');
const UserTokenRepository = {
    async getAllToken() {
        const query = `SELECT * FROM users WHERE user_id = ?`;
    }
}