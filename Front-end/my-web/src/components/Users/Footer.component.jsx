import React from "react";

const FooterComponent = () => {
    return (
        <footer className="bg-black text-light pt-5 pb-3 mt-5">
            <div className="container">
                <div className="row">
                    {/* Logo + mô tả */}
                    <div className="col-md-3 mb-3">
                        <h2 className="fw-bold">ExamFlow</h2>
                        <p className="small">
                            Nền tảng quản lý và tổ chức thi trực tuyến an toàn, tiện lợi và hiệu quả.
                        </p>
                    </div>

                    {/* Liên kết nhanh */}
                    <div className="col-md-3 mb-3">
                        <h5 className="fw-semibold">Liên kết nhanh</h5>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-decoration-none text-light">Trang chủ</a></li>
                            <li><a href="/about" className="text-decoration-none text-light">Giới thiệu</a></li>
                            <li><a href="/exams" className="text-decoration-none text-light">Bài thi</a></li>
                            <li><a href="/contact" className="text-decoration-none text-light">Liên hệ</a></li>
                        </ul>
                    </div>

                    {/* Hỗ trợ */}
                    <div className="col-md-3 mb-3">
                        <h5 className="fw-semibold">Hỗ trợ</h5>
                        <ul className="list-unstyled">
                            <li><a href="/help" className="text-decoration-none text-light">Trung tâm trợ giúp</a></li>
                            <li><a href="/privacy" className="text-decoration-none text-light">Chính sách bảo mật</a></li>
                            <li><a href="/terms" className="text-decoration-none text-light">Điều khoản sử dụng</a></li>
                        </ul>
                    </div>

                    {/* Liên hệ */}
                    <div className="col-md-3 mb-3">
                        <h5 className="fw-semibold">Liên hệ</h5>
                        <p className="small">📍 123 Nguyễn Văn Cừ, Quận 5, TP.HCM</p>
                        <p className="small">📧 support@examflow.com</p>
                        <p className="small">📞 +84 123 456 789</p>
                        <div className="d-flex gap-3 mt-2">
                            <a href="#" className="text-light"><i className="fab fa-facebook"></i></a>
                            <a href="#" className="text-light"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="text-light"><i className="fab fa-linkedin"></i></a>
                        </div>
                    </div>
                </div>

                <hr className="border-secondary" />
                <div className="text-center small">
                    © 2025 ExamFlow. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default FooterComponent;
