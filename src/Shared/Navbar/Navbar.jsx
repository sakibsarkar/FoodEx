import "./Navbar.css";
import SearchSuggestion from "../../Components/SearchSuggestion/SearchSuggestion";
import Swal from "sweetalert2/dist/sweetalert2.js";
import UseAxios from "../../Hooks & Functions/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useContext, useRef, useState } from "react";
import { BiHomeHeart } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { GiScooter } from "react-icons/gi";
import { GrWorkshop } from "react-icons/gr";
import { IoLocationOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { LiaUserEditSolid } from "react-icons/lia";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { Mycontext } from "../../Authcontext/Authcontext";

const Navbar = () => {

    const [showDropdown, setShowDropdown] = useState(false)
    const { user, logOut, role } = useContext(Mycontext)
    const userName = user?.displayName?.split(" ")[0]



    const axios = UseAxios()

    const handleLogout = () => {
        Swal.fire({

            title: "Do you want to Logout",
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No,`
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                logOut()
                await axios.post("/logout")

                Swal.fire("Successfully loged out", "", "success");
            } else if (result.isDenied) {

                return
            }
        });
    }






    return (
        <nav className="navbar">
            <div className="navbarContainer">

                <div className="navbarTop">

                    <div className="logo">
                        <h1>Food<span>EX</span></h1>
                    </div>

                    <div className="address">
                        <IoLocationOutline />
                        <p>Choose your <span>location</span></p>
                    </div>

                    {
                        user ?
                            <div className="userBox" onClick={() => setShowDropdown(!showDropdown)} >
                                <div className="avatar">
                                    <img src={user?.photoURL} />
                                </div>
                                <div className="user_super">
                                    <p style={{ fontWeight: "500" }}>Hello,{userName}</p>
                                    <p style={{ color: "#8f8f8f" }}>See more...</p>
                                </div>

                                <div className={showDropdown ? "userDropDown showDropdown" : "userDropDown"} >
                                    <Link><CiUser />Profile</Link>
                                    <Link to={"/orderHistory"}><LiaFileInvoiceDollarSolid />Order History</Link>
                                    <Link><LiaUserEditSolid />Update Profile</Link>

                                    {
                                        role === "admin" ?
                                            <Link to={"/dashboard/admin"}><MdOutlineSpaceDashboard />Dashboard</Link>

                                            : ""
                                    }

                                    {
                                        role === "vendor" ?
                                            <Link to={"/dashboard/vendor"}><MdOutlineSpaceDashboard />Dashboard</Link>

                                            : ""
                                    }

                                    {
                                        role === "user" ?
                                            <Link to={"/becomeVendor"}><GrWorkshop />Become a Vendor</Link>

                                            : ""
                                    }


                                    <button className="logoutBtn"
                                        onClick={handleLogout}
                                    ><CiLogout />Logout</button>
                                </div>
                            </div>
                            :
                            <Link className="login" to={"/login"}>
                                <FaRegUser />
                                <p>LOGIN</p>
                            </Link>
                    }

                </div>


                <div className="navbarBottom">
                    <div className="links">
                        <NavLink to={"/"} className={"navlinks"}><BiHomeHeart />Home</NavLink>
                        <NavLink to={"/delivery"} className={"navlinks"}><GiScooter />Delivery</NavLink>
                        <NavLink to={"/restaurants"} className={"navlinks"}><FaShop />Restaurants</NavLink>
                    </div>
                    <SearchSuggestion />

                    <div className="actionButtons">
                        <NavLink to={"/cart"}><IoCartOutline /></NavLink>
                        <NavLink to={"/fav"}><CiHeart /></NavLink>
                    </div>
                </div>


            </div>

        </nav >
    );
};

export default Navbar;