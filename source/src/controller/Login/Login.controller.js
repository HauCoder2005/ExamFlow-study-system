const LoginRepository = require("../../repositories/Login/Login.repository");
const bcrypt = require("bcrypt");
const verifyToken = require('../../middleware/VerifyToken');
const user = require("../../model/Users.model");
const LoginController = {
    async logins(req, res) {
        const { email, password } = req.body;
        if(!email || !password) {
            console.log("Mật khẩu hoặc email sai! Vui lòng thử lại...");
            return res.status(400).send({
                message: 'Incorrect email or password',
            })
        }
        try {
            console.log(email, "+", password);
            const users = await LoginRepository.findUserForLogin(email, password);
            console.log(users);
            const token = verifyToken.generateToken(users);
            if (users) {
                res.status(200).json({
                    message: "Đăng nhập thành công!",
                    token,
                    user: {
                        id: users.id,
                        first_name: users.first_name,
                        last_name: users.last_name,
                        email: users.email,
                        roleMapping: users.roleMapping
                    },

                });
            } else {
                res.status(401).json({ message: "Email hoặc mật khẩu không đúng." });
            }
        }  catch (err) {
            console.error(err);
            res.status(500).json({ message: "Đã xảy ra lỗi trong quá trình đăng nhập." });
        }
    },
    async register(req, res) {
        const { first_name, last_name, email, password } = req.body;
        try {
            const newUser = await LoginRepository.CreateNewUser(req.body);
            if (newUser != null) {
                res.status(200).json({
                    message: "Đăng ký thành công!",
                    user: {
                        id: newUser.id,
                        first_name: newUser.first_name,
                        last_name: newUser.last_name,
                        email: newUser.email,
                    }
                })
                console.log(newUser);
            } else {
                res.status(400).json({ message: "Đăng ký thất bại!" });
            }
        } catch(err) {
            console.error(err.message);
            if (err.message === "Email already exists") {
                res.status(400).json({ message: "Email đã được sử dụng!" });
            } else {
                res.status(500).json({ message: "Lỗi máy chủ!" });
            }
        }
    }
};

module.exports = LoginController;