import "./OrderHistoryCard.css";
import { CiClock2 } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { MdOutlineRestaurant } from "react-icons/md";

const OrderHistoryCard = ({ data, setShouldOpen, shouldOpen }) => {
    const { _id, user_name, user_email, total, order_status, date, orderData = [], order_id } = data

    const show = shouldOpen === _id

    const handleShouldShow = () => {
        if (shouldOpen === _id) {
            return setShouldOpen("")
        }

        setShouldOpen(_id)
    }

    return (
        <div className="historyCard" onClick={handleShouldShow}>
            <div className="topPart">
                <div>
                    <h2>{date}</h2>
                    <p><MdOutlineRestaurant />{orderData[0]?.vendor_name}</p>
                    {
                        order_status === "pending" && <p style={{ color: "#e06565" }}><CiClock2 />{order_status}</p>
                    }
                    {
                        order_status === "completed" && <p style={{ color: "#71e065" }}><IoCheckmarkDoneOutline />{order_status}</p>
                    }
                </div>
                <button className={show ? "notShowBtn" : ""}>
                    <IoIosArrowDown />
                </button>
            </div>

            <div className={show ? "bottomPart shouldShow" : "bottomPart"}>
                {orderData?.map((items, index) => <div
                    key={index}
                >
                    <p>{items?.name}</p>
                    <p>{items?.price}</p>
                </div>)}

                <h2>Total: {total}</h2>
            </div>



        </div>
    );
};

export default OrderHistoryCard;