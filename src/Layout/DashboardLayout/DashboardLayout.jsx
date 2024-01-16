import "./DashboardLayout.css";
import Dashbar from "../../DashboardPages/Dashbar/Dashbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div className="dashboardContainer">
            <Dashbar />
            <div className="dashOutlets">
                <Outlet />
            </div>

        </div>
    );
};

export default DashboardLayout;