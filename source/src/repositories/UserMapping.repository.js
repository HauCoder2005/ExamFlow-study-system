const config = require("../config/config");

const UserRoleMapping = {
    async getAllUserRoleMapping() {
        const query = `SELECT * FROM user_role_mapping`;
        return new Promise((resolve, reject) => {
            config.query(query, (err, result) => {
                if (err) return reject(err);
                resolve(result.map(userRole => ({
                    user_id: userRole.user_id,
                    role_id: userRole.role_id,
                })));
            })
        })
    }
};

module.exports = UserRoleMapping;