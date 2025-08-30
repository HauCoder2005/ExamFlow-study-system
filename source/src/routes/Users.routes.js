const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const userRolesController = require("../controller/Users.controller");

const router = express.Router();

// Đảm bảo thư mục lưu ảnh tồn tại
const uploadDir = path.join(__dirname, "../public/images/users");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/images/users"));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

// Lấy danh sách user
router.get('/', userRolesController.getAllUsers);

// Lấy user theo id
router.get('/:id', userRolesController.getUserById);

// Update user có kèm upload ảnh
router.put('/edit-user/:id', upload.single('profile_image'), userRolesController.EditUserById);

// Lấy danh sách sinh viên của teacher
router.get('/teacher/:id', userRolesController.getAllStudents);

module.exports = router;
