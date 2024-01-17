import "./VendorRequestCard.css";
import UseAxios from "../../Hooks & Functions/useAxios";
import { FaHandshake } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { TfiEmail } from "react-icons/tfi";
import { toast } from "sonner";

const VendorRequestCard = ({ data, refetch }) => {
    const { _id, owner_name, owner_email, vendor_name, logo, banner, status } = data


    const axios = UseAxios()

    const handleAction = async (action) => {
        const toastId = toast.loading("Processing...")
        try {
            const { data: updateData } = await axios.put("/req/process", { id: _id, status: action })
            toast.dismiss(toastId)
            toast.success("Successfull")
            refetch()
        }

        catch (err) {
            console.log(err);
            toast.dismiss(toastId)
            toast.error("Something went wrong")
        }




    }
    return (
        <div className="reqCard">
            <div className="cardBanner">
                <img src={banner} alt="" />
            </div>
            <div className="cardLogo">
                <img src={logo} alt="" />
            </div>

            <div className="reqInfo">
                <h1>{vendor_name}</h1>
                <p>
                    <FaRegUser />

                    <span>
                        <span className="hyperSpan">Owner Name:</span> {owner_name}
                    </span>

                </p>
                <p>

                    <TfiEmail />
                    <span className="hyperSpan">Owner email:</span> {owner_email}

                </p>
            </div>
            <div className="reqActionBtn">
                <button onClick={() => handleAction("rejected")}><RxCrossCircled />Reject</button>
                <button style={{ background: "#1f68ff", color: "white" }}
                    onClick={() => handleAction("accepted")}
                ><FaHandshake />Accept</button>
            </div>

        </div>
    );
};

export default VendorRequestCard;

