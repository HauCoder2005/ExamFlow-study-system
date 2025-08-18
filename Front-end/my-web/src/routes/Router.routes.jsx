import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home.pages.jsx";
import AdminHome from "../pages/Admin/AdminHome.pages.jsx";
import UserHome from "../pages/User/UserHome.pages.jsx";
import LoginUser from "../pages/Auth/Login.pages.jsx";
import Register from "../pages/Auth/Register.pages.jsx";
import ForgotPassword from "../pages/Auth/ForgotPassword.pages.jsx";
import UsersLayout from "../components/layouts/Users.layout.jsx"; // Layout chứa Header + Footer
import OnlineExam from "../pages/User/others/OnlineExam.pages.jsx";
import CoursesDetail from "../pages/User/others/CoursesDetail.pages.jsx";
import VerifyOtpEmail from "../pages/Auth/VerifyOtpEmail.pages.jsx";
import ChangePassword from "../pages/Auth/ChangePassword.pages.jsx";
import UserDetail from "../components/Users/UsersDetail.component.jsx";
import TeacherHome from "../pages/Teacher/TeacherHome.pages.jsx";
import TeachersLayout from "../components/layouts/Teachers.layout.jsx";
import OnlineExamTeacher from "../pages/Teacher/others/OnlineExamTeacher.pages.jsx";
import CoursesDetailTeacher from "../pages/Teacher/others/CoursesDetailTeacher.pages.jsx";

const Router = () => {
    return (
        <>
            <Routes>
                {/* Layout dành cho người dùng */}
                <Route element={<UsersLayout />}>
                    <Route index element={<Home />} />
                    <Route path="user/:id" element={<UserHome />} />
                    <Route path="online-exam" element={<OnlineExam />} />
                    <Route path="courses-detail/:id" element={<CoursesDetail />} />
                    <Route path="user-detail/:id" element={<UserDetail />} />
                </Route>

                {/* Layout dành cho giáo viên */}
                <Route path="teacher" element={<TeachersLayout />}>
                    <Route index element={<Home />} />
                    <Route path=":id" element={<TeacherHome />} />
                    <Route path="/teacher/online-exam-teacher/:id" element={<OnlineExamTeacher />} />
                    <Route path="/teacher/courses-detail/:id" element={<CoursesDetailTeacher />} />
                </Route>

                {/* Auth routes - không dùng layout */}
                <Route path="login" element={<LoginUser />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="verify-otp" element={<VerifyOtpEmail />} />
                <Route path="change-password" element={<ChangePassword />} />

                {/* Admin */}
                <Route path="admin" element={<AdminHome />} />
            </Routes>

        </>
    );
};

export default Router;