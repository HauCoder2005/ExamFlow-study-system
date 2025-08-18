import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const HeaderComponent = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Load user + role từ localStorage một cách an toàn
    const loadUserFromStorage = useCallback(() => {
        const accessToken = localStorage.getItem("accessToken");
        const storedUser = localStorage.getItem("user");
        const storedRole = localStorage.getItem("role"); // fallback nếu bạn lưu role riêng

        if (!accessToken) {
            setUser(null);
            return;
        }

        if (storedUser) {
            try {
                const parsed = JSON.parse(storedUser);

                // nhiều API trả role khác nhau, nên thử nhiều chỗ
                const roleIdFromUser =
                    parsed?.roleMapping?.role_id ??
                    parsed?.role_id ??
                    parsed?.role?.id ??
                    parsed?.role;

                const roleId = roleIdFromUser ?? (storedRole ? Number(storedRole) : null);

                const normalizedUser = {
                    ...parsed,
                    id: parsed?.id ?? parsed?.userId ?? parsed?.user_id, // bình thường là id
                    first_name: parsed?.first_name ?? parsed?.firstName ?? "",
                    last_name: parsed?.last_name ?? parsed?.lastName ?? "",
                    role_id: roleId ? Number(roleId) : null,
                };

                setUser(normalizedUser);
            } catch (err) {
                console.error("Lỗi khi parse user từ localStorage:", err);
                setUser(null);
            }
        } else if (storedRole) {
            // chỉ có role nhưng không có user object
            setUser({ role_id: Number(storedRole) });
        } else {
            setUser(null);
        }
    }, []);

    // load khi mount và khi location thay đổi (navigate / back / forward)
    useEffect(() => {
        loadUserFromStorage();
    }, [loadUserFromStorage, location]);

    // đồng bộ giữa các tab khi thay đổi localStorage
    useEffect(() => {
        const onStorage = (e) => {
            if (e.key === "user" || e.key === "accessToken" || e.key === "role") {
                loadUserFromStorage();
            }
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, [loadUserFromStorage]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("role");
        setUser(null);
        navigate("/login");
        // KHÔNG gọi window.location.reload() nữa
    };

    // Link động theo role
    const homeLink = user ? (user.role_id === 1 ? `/teacher/${user.id || ""}` : `/user/${user.id || ""}`) : "/";
    const examsLink = user ? (user.role_id === 1 ? "/teacher/exams" : "/online-exam") : "/online-exam";
    const profileLink = user ? (user.role_id === 1 ? `/teacher/${user.id || ""}` : `/user-detail/${user.id || ""}`) : "/login";

    return (
        <nav className="navbar navbar-expand-lg bg-black shadow-sm px-4 sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold fs-4 text-white" to="/">
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
                            <Link className="nav-link text-white" to={homeLink}>
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link text-white" to={examsLink}>
                                Online Exams
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/blog">
                                Blog
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/supports">
                                Supports
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
                                👋 Xin chào, {user.first_name || "Người dùng"}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    <Link className="dropdown-item" to={profileLink}>
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

export default HeaderComponent;
