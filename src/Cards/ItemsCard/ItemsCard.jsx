import "./ItemsCard.css";
import sound from "../../assets/click.mp3";
import { useContext } from "react";
import { CiClock1 } from "react-icons/ci";
import { TbCurrencyTaka } from "react-icons/tb";
import { Mycontext } from "../../Authcontext/Authcontext";
import { countTotal } from "../../Hooks & Functions/countTotal";

const ItemsCard = ({ data }) => {

    const { _id, image, name, price, category, vendor_name, vendor_id, vendor_email, description, delivery_time } = data
    const { cart, setCart, setTotal } = useContext(Mycontext)

    const productName = name?.length > 22 ? name.substring(0, 22) + "..." : name

    // add to cart
    const handleAdd = () => {
        let audio = new Audio()
        audio.src = sound
        setCart([...cart, { name, price, category, vendor_name, vendor_id, vendor_email }])
        const totalPrice = countTotal([...cart, data])
        audio.play()
        setTotal(totalPrice)
    }
    return (
        <div className="itemWrapper" >
            <div className="itemImage">
                <img src={image} alt="" />
            </div>

            <div className="itemInfo">
                <h1>{productName}</h1>
                <div className="row">
                    <p><TbCurrencyTaka />{price}</p>
                    <p style={{ color: "#da1481" }}><CiClock1 />{delivery_time}</p>
                </div>
            </div>

            <button onClick={handleAdd}>Add to cart</button>

        </div>
    );
};

export default ItemsCard;