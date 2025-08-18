const verifyToken = require('../middleware/VerifyToken');
const config = require('../config/config');
const bcrypt = require('bcrypt');
exports.login = (req, res) => {
    const { email, password } = req.body;
    const query = `SELECT * FROM users WHERE email = ?`;
    if (!email || !password) {
        return res.status(400).send({
            message: 'Incorrect email or password',
        })
    }
    // kiem tra trong database
    config.query(query, [email], async (err, result) => {
        if (err) throw err;
        const user = result.rows[0];
        if (!user) {
            return res.status(400).send({
                message: 'Incorrect email or password',
            })
        }
        const isMath = await bcrypt.compare(password, user.password);
        if (!isMath) {
            return res.status(401).send({
                message: 'Incorrect email or password',
            })
        }
        const token = verifyToken.generateToken(user);
        return res.json({
            message: "Đăng nhập thành công",
            token,
            user: { id: user.id, email: user.email, role: user.role }
        });

    })
}
