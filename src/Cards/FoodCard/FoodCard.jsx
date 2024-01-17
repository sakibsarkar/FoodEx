import "./FoodCard.css";
import { FaRegClock } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { MdRestaurant } from "react-icons/md";
import { Link } from "react-router-dom";

const FoodCard = ({ data = {} }) => {
    const { _id, image, name, price, category, vendor_name, vendor_id, vendor_email, description, delivery_time } = data
    return (
        <Link className="foodCard" to={`/shop/${vendor_id}`}>
            <p className="favIcon"><FaRegHeart /></p>
            <div className="foodImg" >
                <img src={image} alt="" draggable={false} />
            </div>
            <div className="infoWrapper">
                <h1>{name}</h1>
                <span><MdRestaurant />{vendor_name}</span>

                <div className="info">
                    <p><FaBangladeshiTakaSign /> {price}</p>
                    <p style={{ color: "#f840a5" }}><FaRegClock />{delivery_time}</p>
                </div>
            </div>
        </Link>
    );
};

export default FoodCard;