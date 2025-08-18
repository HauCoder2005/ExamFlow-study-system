import React from "react";
import FooterComponent from "../Footer.components";
import { Outlet } from "react-router-dom";
import HeaderTeacherComponent from "../HeaderTeacher.components";
const TeachersLayout = () => {
    return (
        <>
            <HeaderTeacherComponent />
            <main>
                <Outlet />
            </main>
            <FooterComponent />
        </>
    )
}
export default TeachersLayout;