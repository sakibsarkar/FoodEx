import "./Banner.css";
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div className="bannerContainer">
            <h1>Hungry! <br />Grab Some <span>Food</span></h1>
            <p> Browse our diverse menus, savor enticing dishes, and embark on a culinary journey from the comfort of your home. Fast, reliable, and utterly delicious - Order now for a feast at your fingertips!</p>

            <Link>Explore Items</Link>
        </div>
    );
};

export default Banner;