import "./CompletedOrderCard.css";
import { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { CiCalendarDate } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { MdOutlineContentCopy } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";

const CompletedOrderCard = ({ data = {} }) => {

    const { _id, user_name, user_email, total, date, orderData } = data

    const [show, setShow] = useState(false)

    const [_, copy] = useCopyToClipboard()
    const handleCopy = () => {
        copy(_id)
        toast.success("Successfuly copied to your clipboard")
    }
    return (
        <div className="completed_card">

            <h3><CiCalendarDate /> Date: {date}</h3>
            <h4 onClick={handleCopy}><MdOutlineContentCopy /> Id:{_id}</h4>

            <div className="customer">
                <p><CiUser /> {user_name}</p>
                <p><AiOutlineMail /> {user_email}</p>
            </div>

            <div>
                <h2>Total Items: {orderData?.length}</h2>
                <h2>Total: ৳{total}</h2>
            </div>
            <button onClick={() => setShow(true)}>View Order Item</button>

            {
                show ?
                    <div className="itemHolder">
                        <div className="orderItems">
                            <div className="cross" onClick={() => setShow(false)}>
                                <RxCross2 />
                            </div>
                            {
                                orderData?.map((details, indx) => <div key={indx}>
                                    <p>{details.name}</p>
                                    <p>৳{details.price}</p>
                                </div>)
                            }

                        </div>
                    </div>
                    :
                    ""
            }

        </div>
    );
};

export default CompletedOrderCard;
