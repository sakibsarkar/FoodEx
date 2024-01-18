import "./OrderCard.css";
import Swal from "sweetalert2";
import UseAxios from "../../Hooks & Functions/useAxios";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { toast } from "sonner";

const OrderCard = ({ order, refetch }) => {
    const { _id, user_name, user_email, total, order_status, date, orderData = [] } = order

    const axios = UseAxios()

    const handleCompleted = async () => {
        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `Cancel`
        }).then(async (result) => {

            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const toastId = toast.loading("Please wait")
                axios.put(`/order/complete?id=${_id}`)
                toast.dismiss(toastId)
                toast.success("Congratulations...")
                refetch()
            } else if (result.isDenied) {
                return
            }
        });

    }

    return (
        <div className="orderCard">

            <div style={{ width: "100%" }} className="xWrapper">
                {orderData?.map((data, i) => <div
                    key={i}
                    className="orderInfo"
                >
                    <p><IoIosArrowDroprightCircle />{data?.name}</p>
                    <p>{data.price}</p>
                </div>)}
            </div>

            <button onClick={handleCompleted}>Complete order For ৳{total}</button>
        </div>
    );
};

export default OrderCard;