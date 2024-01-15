import "./Navbar.css";
import { useContext } from "react";
import { BiHomeHeart } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { GiScooter } from "react-icons/gi";
import { IoLocationOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { Mycontext } from "../../Authcontext/Authcontext";

const Navbar = () => {


    const { user, logOut } = useContext(Mycontext)

    const userName = user?.displayName?.split(" ")[0]

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
                            <div className="userBox">
                                <div className="avatar">
                                    <img src={user?.photoURL} />
                                </div>
                                <div className="user_super">
                                    <p>{userName}</p>
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
                    <div className="searchBar">
                        <input type="text" placeholder="Biriyani near me" />
                        <button>Find food</button>
                    </div>

                    <div className="actionButtons">
                        <NavLink to={"/cart"}><IoCartOutline /></NavLink>
                        <NavLink to={"/fav"}><CiHeart /></NavLink>
                    </div>
                </div>


            </div>

        </nav>
    );
};

export default Navbar;