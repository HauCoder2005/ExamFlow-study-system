import React from "react";
import { Outlet } from "react-router-dom";
import HeaderTeacherComponent from "../HeaderTeacher.components";
import FooterComponent from "../Users/Footer.component";

const TeachersLayout = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <HeaderTeacherComponent />

            <main className="flex-fill">
                <Outlet />
            </main>

            <FooterComponent />
        </div>
    );
};

export default TeachersLayout;
