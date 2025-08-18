const config = require("../config/config");

const usersRepository = {
    async getAllUsers() {
        const sql = "SELECT * FROM users";
        return new Promise((resolve, reject) => {
            config.query(sql, (err, result) => {
                if(err) return reject(err);
                resolve(result.map(user => (
                    {
                        id: user.id,
                        password: user.password,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        profile_image: user.profile_image,
                        created_at: user.created_at,
                        updated_at: user.updated_at,
                    }
                )));
            })
        })
    },
    async getUserById(id) {
        const sql = "SELECT * FROM users WHERE id = ?";
        return new Promise((resolve, reject) => {
            config.query(sql, [id] ,(err, result) => {
                if(err) return reject(err);
                resolve(result.map(user => (
                    {
                        id: user.id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        profile_image: user.profile_image,
                        created_at: user.created_at,
                        updated_at: user.updated_at,
                        place_of_birth: user.place_of_birth,
                        major: user.major,
                        graduation_year: user.graduation_year,
                        date_of_birth: user.date_of_birth,
                    }
                )))
            })
        })
    },
    async EditUserById(id, data) {
        const query = `
        UPDATE users SET
            first_name = ?,
            last_name = ?,
            profile_image = ?,
            place_of_birth = ?, 
            major = ?,
            graduation_year = ?
        WHERE id = ?`;

        return new Promise((resolve, reject) => {
            const {
                first_name,
                last_name,
                profile_image,
                place_of_birth,
                major,
                graduation_year,
            } = data;

            const params = [
                first_name,
                last_name,
                profile_image,
                place_of_birth,
                major,
                graduation_year,
                id
            ];

            config.query(query, params, (err, result) => {
                if (err) return reject(err);
                resolve(result.affectedRows > 0);
            });
        }); 
    },

    async getAllStudents(id) {
        const sql = `
            SELECT u.id, u.first_name, u.last_name, u.email,
                   u.profile_image, u.created_at, u.updated_at
            FROM StudentClassMapping scm
                     JOIN Classes c ON scm.class_id = c.id
                     JOIN Users u ON scm.student_id = u.id
            WHERE c.homeroom_teacher_id = ?
        `;

        return new Promise((resolve, reject) => {
            config.query(sql, [id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }


}
module.exports = usersRepository;