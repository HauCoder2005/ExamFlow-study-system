import HeaderComponent from "../Header.components";
import { Outlet } from "react-router-dom";
import FooterComponent from "../Users/Footer.component";

const UsersLayout = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
     
            <HeaderComponent />

            <main className="flex-fill">
                <Outlet />
            </main>

            <FooterComponent />
        </div>
    );
};

export default UsersLayout;
