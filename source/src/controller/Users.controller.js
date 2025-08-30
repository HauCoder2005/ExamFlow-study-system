const usersRepository = require("../repositories/Users.repositories");
const userModel = require("../model/Users.model");
const user = require("../model/Users.model");
const usersController = {
    async getAllUsers(req, res) {
        try {
            const users = await usersRepository.getAllUsers();

            if(users.length > 0) {
                const UserInstance = users.map(
                    user => new userModel(
                        user.id,
                        user.password,
                        user.first_name,
                        user.last_name,
                        user.email,
                        user.profile_image,
                        user.created_at,
                        user.updated_at
                    )
                )
                res.status(200).json(UserInstance);
            }
            else {
                res.status(404).json({message: "khong co data!"})
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async getUserById(req, res) {
        try {
            const { id } = req.params;

            const user = await usersRepository.getUserById(id);

            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "Không có dữ liệu!" });
            }
        } catch (err) {
            console.error("Lỗi khi lấy người dùng theo ID:", err);
            res.status(500).json({ message: "Lỗi server", error: err.message });
        }
    },
    async EditUserById(req, res) {
        try {
            const { id } = req.params;
            const data = { ...req.body };

            if (req.file) {
                const protocol = (req.headers['x-forwarded-proto'] || req.protocol);
                const host = req.get('host');
                data.profile_image = `${protocol}://${host}/images/users/${req.file.filename}`;
            }

            const isUpdated = await usersRepository.EditUserById(id, data);

            if (!isUpdated) {
                return res.status(404).json({
                    message: 'User not found or no changes made.',
                });
            }

            return res.status(200).json({
                message: 'User updated successfully',
                // Nếu cần trả về lại user mới để FE set state ngay:
                // user: await usersRepository.GetOneUser(id)
            });
        } catch (err) {
            console.error('Error while updating user by ID:', err);
            return res.status(500).json({
                message: 'Internal server error',
                error: err.message,
            });
        }
    },


    async getAllStudents(req, res) {
        try {
            const { id } = req.params;
            const users = await usersRepository.getAllStudents(id);
            if (users) {
                res.status(200).json(users);
            } else {
                res.status(404).json({ message: "Không có dữ liệu!" });
            }
        } catch(err) {
            console.error("Error get all students", err);
            res.status(500).json({
                message: "Internal server error",
                error: err.message,
            })
        }
    }

}
module.exports = usersController;