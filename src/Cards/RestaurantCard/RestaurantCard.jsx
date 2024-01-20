import "./RestaurantCard.css";
import { Link } from "react-router-dom";

const RestaurantCard = ({ item }) => {

    const { _id, owner_name, owner_email, vendor_name, logo, banner, varyfied, likedBy } = item
    return (
        <div className="rest_card">
            <div className="rest_banner">
                <img src={banner} alt="" />
            </div>

            <div className="rest_hero">
                <div className="rest_logo">
                    <img src={logo} alt="" />
                </div>
                <h2>{vendor_name}</h2>
            </div>

            <Link to={`/shop/${_id}`}>Visit</Link>

        </div>
    );
};

export default RestaurantCard;