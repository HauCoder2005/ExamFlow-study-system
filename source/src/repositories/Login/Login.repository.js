const db = require("../../config/config");
const UserModels = require("../../model/Users.model");
const bcrypt = require("bcrypt");
const userRoleMapping = require('../../model/UserRoleMapping.model');
const LoginRepository = {
    async findUserForLogin(email, password) {
        console.log(email, password);
        return new Promise((resolve, reject) => {
            const sql = `
                            SELECT
                             u.*,
                             um.role_id
                            FROM
                                Users u
                            JOIN
                                user_role_mapping um ON u.id = um.user_id
                            WHERE
                             u.email = ?;
            `;
            db.query(sql, [email], async (err, result) => {
                if (err) return reject(err);
                if (result.length === 0) return resolve(null);
                const row = result[0];

                // So sánh mật khẩu nhập vào với mật khẩu đã hash
                const match = await bcrypt.compare(password, row.password);
                if (!match) return resolve(null); // Sai mật khẩu

                const user = new UserModels(
                    row.id,
                    row.password,
                    row.first_name,
                    row.last_name,
                    row.email,
                    row.profile_image,
                    row.created_at,
                    row.updated_at,
                    row.token,
                );
                user.roleMapping = new userRoleMapping(row.id, row.role_id);
                if (user.roleMapping.role_id === 1) {
                    console.log("Role: Teacher");
                } else if (user.roleMapping.role_id === 2) {
                    console.log("Role: Student");
                } else {
                    console.log("Role: Unknown");
                }

                resolve(user);
            });
        });
    },

    async CreateNewUser(users) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(users.password, 10, (err, hashPassword) => {
                if (err) return reject(err);

                const { first_name, last_name, email } = users;

                db.query(
                    "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
                    [first_name, last_name, email, hashPassword],
                    (err, result) => {
                        if (err) return reject(err);
                        resolve({
                            id: result.insertId,
                            first_name,
                            last_name,
                            email,
                        });
                    }
                );
            });
        });
    }
}
module.exports = LoginRepository;