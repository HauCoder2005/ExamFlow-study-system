import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const HeaderTeacherComponent = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const storedUser = localStorage.getItem("user");
        const role = localStorage.getItem("role");
        if (!accessToken || !storedUser || role !== "1") {
            navigate("/login", { replace: true });
            return;
        }
        try {
            const parsedUser = JSON.parse(storedUser);
            const normalizedUser = {
                ...parsedUser,
                first_name: parsedUser.first_name || parsedUser.firstName || "",
                last_name: parsedUser.last_name || parsedUser.lastName || "",
            };
            setUser(normalizedUser);
        } catch (error) {
            console.error("Lỗi khi parse user từ localStorage:", error);
            setUser(null);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("role");
        setUser(null);
        navigate("/login", { replace: true });
    };

    return (
        <nav className="navbar navbar-expand-lg bg-black shadow-sm px-4 sticky-top">
            <div className="container-fluid">
                <Link
                    className="navbar-brand fw-bold fs-4 text-white"
                    to={user ? `/teacher/${user.id}` : "/"}
                >
                    <img
                        src="/images/logo-new.png"
                        alt="Course"
                        style={{ height: "28px", marginRight: "10px" }}
                    />
                    ExamFlow
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-4">
                        <li className="nav-item">
                            <Link
                                className="nav-link text-white"
                                to={user ? `/teacher/${user.id}` : "/"}
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to={`/teacher/online-exam-teacher/${user?.id}`}>
                                Exams
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to={`/teacher/${user?.id}/classrooms`}>
                                Classrooms
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to={`/teacher/${user?.id}/scores`}>
                                Scores
                            </Link>
                        </li>
                    </ul>

                    {!user ? (
                        <Link to="/login" className="btn btn-outline-light px-4 text-white">
                            Đăng Nhập
                        </Link>
                    ) : (
                        <div className="dropdown">
                            <button
                                className="btn btn-light dropdown-toggle fw-semibold text-dark"
                                type="button"
                                data-bs-toggle="dropdown"
                            >
                                👋 Xin chào, {user.last_name}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                        <Link className="dropdown-item" to={`/user-detail/${user.id}`}>
                                        Thông tin cá nhân
                                    </Link>
                                </li>
                                <li>
                                    <button className="dropdown-item" onClick={handleLogout}>
                                        Đăng xuất
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default HeaderTeacherComponent;
