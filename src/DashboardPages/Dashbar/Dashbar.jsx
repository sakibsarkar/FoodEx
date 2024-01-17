import "./Dashbar.css";
import AdminDashLinks from "../../Components/AdminDashLinks/AdminDashLinks";
import VendorDashLinks from "../../Components/VendorDashLinks/VendorDashLinks";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Mycontext } from "../../Authcontext/Authcontext";

const Dashbar = () => {
    const { role } = useContext(Mycontext)

    return (
        <div className="dashbarContainer">
            <Link to={"/"} className="logo">
                <h1>FOOD<span>EX</span></h1>
            </Link>

            <div className="dashLinks">
                {/* vendor route links */}
                {

                    role === "admin" ? <AdminDashLinks /> : ""
                }



                {/* vendor route links */}
                {

                    role === "vendor" ? <VendorDashLinks /> : ""
                }
            </div>


        </div>
    );
};

export default Dashbar;