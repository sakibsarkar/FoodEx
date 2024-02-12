import { IoAnalyticsOutline, IoFastFoodOutline } from "react-icons/io5";
import { LuAlarmClock } from "react-icons/lu";
import { NavLink } from "react-router-dom";

const VendorDashLinks = () => {
    return <>
        <NavLink to={"/dashboard/vendor"}><IoAnalyticsOutline /> Overview</NavLink>

        <NavLink to={"/dashboard/manageShop"}><IoFastFoodOutline />Manage Shop</NavLink>

        <NavLink to={"/dashboard/pendingOrders"}><LuAlarmClock />Pending Orders</NavLink>

        <NavLink to={"/dashboard/completedOrder"}><IoFastFoodOutline /> All Completed Order</NavLink>
    </>
};

export default VendorDashLinks;