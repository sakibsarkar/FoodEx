import { FaRegUser, FaUserTie } from "react-icons/fa";
import { FaShopLock } from "react-icons/fa6";
import { GoGitPullRequest } from "react-icons/go";
import { NavLink } from "react-router-dom";

const AdminDashLinks = () => {
    return <>
        <NavLink to={"/dashboard/admin"}><GoGitPullRequest />Vendor Requests</NavLink>

        <NavLink to={"/dashboard/myshop"}><FaShopLock />My shop</NavLink>

        <NavLink to={"/dashboard/users"}><FaRegUser />All User</NavLink>

        <NavLink to={"/dashboard/members"}><FaUserTie />All Vendor</NavLink>

    </>
};

export default AdminDashLinks;