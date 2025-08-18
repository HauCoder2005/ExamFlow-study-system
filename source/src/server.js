const roleRoutes = require('./routes/UserRoles.routes');
const usersRoutes = require('./routes/Users.routes');
require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const userRoleMappingRoutes = require('./routes/UserRoleMapping.routes');
const examsRoutes = require('./routes/Exams.routes');
const AuthRoutes = require('./routes/Auth.routes');
const userModel = require('../src/model/Users.model');
const courseRoutes = require('./routes/Courses.routes');
const otpRoutes = require('./routes/Email/sendOtpEmail.routes');
const session = require('express-session');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();
// Middleware

app.use(cors({
    origin: 'http://localhost:3000', // hoặc '*'
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // THÊM PUT vào đây
    credentials: true,
}));

app.use(express.json());

// api routes roles
app.use('/api/roles', roleRoutes);

// api routes users
app.use('/api/users', usersRoutes);


// Routes UserRoleMapping
app.use('/api/user_role_mapping', userRoleMappingRoutes);

// Routes Exams
app.use('/api/exams', examsRoutes);

//
app.use('/api/login', AuthRoutes);

// course
app.use('/api/course', courseRoutes);
// verifyOtp
app.use(session(
    {
        secret: process.env.SESSION_SECRET || 'default-secret',
        resave: false,
        saveUninitialized: true,
        cookie: {maxAge: 5 * 60 * 1000 }
    }
))
// sent-otp
app.use('/api/', otpRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});