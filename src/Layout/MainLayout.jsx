import Footer from "../Shared/Footer/Footer";
import Navbar from "../Shared/Navbar/Navbar";
import ScrollToTopOnPageChange from "../Hooks & Functions/ScrollToTopOnPageChange";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <>
            <ScrollToTopOnPageChange />
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
};

export default MainLayout;