import HeaderComponent from "../Header.components";

import FooterComponent from "../Footer.components";
import { Outlet } from "react-router-dom";
const UsersLayout = () => {
    return(
        <>
            <HeaderComponent />
            <main>
                <Outlet />
            </main>
            <FooterComponent />
        </>
    )
}
export default UsersLayout;