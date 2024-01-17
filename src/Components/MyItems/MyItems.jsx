import "./MyItems.css";
import { CiClock2 } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuPen } from "react-icons/lu";
import { MdOutlineFastfood } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";

const MyItems = ({ item, refetch }) => {
    const { _id, image, name, price, category, vendor_name, vendor_id, vendor_email, description, delivery_time } = item
    return (
        <div className="vendor_product">

            <div className="image">
                <img src={image} alt="" />
            </div>

            <div className="item_info">
                <h2>{name}</h2>
                <p className="price"><TbCurrencyTaka />{price}</p>

                <div className="row">
                    <p><CiClock2 />{delivery_time}</p>
                    <p><MdOutlineFastfood />{category}</p>
                </div>
            </div>

            <div className="itemAction">
                <div className="actionBox">
                    <LuPen />
                </div>
                <div className="actionBox">
                    <FaRegTrashAlt />
                </div>
            </div>

        </div>
    );
};

export default MyItems;