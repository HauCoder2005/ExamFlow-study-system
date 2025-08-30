const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');

const roleRoutes = require('./routes/UserRoles.routes');
const usersRoutes = require('./routes/Users.routes');
const userRoleMappingRoutes = require('./routes/UserRoleMapping.routes');
const examsRoutes = require('./routes/Exams.routes');
const AuthRoutes = require('./routes/Auth.routes');
const courseRoutes = require('./routes/Courses.routes');
const otpRoutes = require('./routes/Email/sendOtpEmail.routes');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
}));

// 🔹 Thêm 2 middleware để parse body
app.use(express.json()); // parse JSON body
app.use(express.urlencoded({ extended: true })); // parse form data

// 👉 Serve ảnh tĩnh: http://localhost:5000/images/users/abc.jpg
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// api routes roles
app.use('/api/roles', roleRoutes);

// api routes users
app.use('/api/users', usersRoutes);

// Routes UserRoleMapping
app.use('/api/user_role_mapping', userRoleMappingRoutes);

// Routes Exams
app.use('/api/exams', examsRoutes);

// Auth
app.use('/api/login', AuthRoutes);

// course
app.use('/api/course', courseRoutes);

// verifyOtp
app.use(session({
    secret: process.env.SESSION_SECRET || 'default-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 5 * 60 * 1000 }
}));

// sent-otp
app.use('/api/', otpRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
