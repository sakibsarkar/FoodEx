import "./Navbar.css";
import { BiHomeHeart } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { GiScooter } from "react-icons/gi";
import { IoLocationOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const Navbar = () => {
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

                    <div className="login">
                        <FaRegUser />
                        <p>LOGIN</p>
                    </div>

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