import "./ItemsCard.css";
import { useContext } from "react";
import { CiClock1 } from "react-icons/ci";
import { TbCurrencyTaka } from "react-icons/tb";
import { Mycontext } from "../../Authcontext/Authcontext";
import { countTotal } from "../../Hooks & Functions/countTotal";

const ItemsCard = ({ data }) => {

    const { _id, image, name, price, category, vendor_name, vendor_id, vendor_email, description, delivery_time } = data
    const { cart, setCart, setTotal } = useContext(Mycontext)

    // add to cart
    const handleAdd = () => {
        setCart([...cart, { name, price, category, vendor_name, vendor_id, vendor_email }])
        const totalPrice = countTotal([...cart, data])
        setTotal(totalPrice)
    }
    return (
        <div className="itemWrapper" onClick={handleAdd}>
            <div className="itemImage">
                <img src={image} alt="" />
            </div>

            <div className="itemInfo">
                <h1>{name}</h1>
                <div className="row">
                    <p><TbCurrencyTaka />{price}</p>
                    <p style={{ color: "#da1481" }}><CiClock1 />{delivery_time}</p>
                </div>
            </div>

        </div>
    );
};

export default ItemsCard;