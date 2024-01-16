import "./Dashbar.css";
import { NavLink } from "react-router-dom";

const Dashbar = () => {
    return (
        <div className="dashbarContainer">
            <div className="dashLinks">
                <NavLink to={"/dashboard/admin"}>Vendor Requests</NavLink>
            </div>
        </div>
    );
};

export default Dashbar;