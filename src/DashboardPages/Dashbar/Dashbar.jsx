import "./Dashbar.css";
import { FaRegUser } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";
import { FaShopLock } from "react-icons/fa6";
import { GoGitPullRequest } from "react-icons/go";
import { NavLink } from "react-router-dom";

const Dashbar = () => {
    return (
        <div className="dashbarContainer">
            <div className="logo">
                <h1>FOOD<span>EX</span></h1>
            </div>

            <div className="dashLinks">
                <NavLink to={"/dashboard/admin"}><GoGitPullRequest />Vendor Requests</NavLink>
                <NavLink to={"/dashboard/myshop"}><FaShopLock />My shop</NavLink>
                <NavLink to={"/dashboard/users"}><FaRegUser />All User</NavLink>
                <NavLink to={"/dashboard/members"}><FaUserTie />All Vendor</NavLink>
            </div>


        </div>
    );
};

export default Dashbar;