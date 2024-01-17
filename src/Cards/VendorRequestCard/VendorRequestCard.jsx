import "./VendorRequestCard.css";
import UseAxios from "../../Hooks & Functions/useAxios";
import { useState } from "react";
import { FaHandshake } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { TfiEmail } from "react-icons/tfi";
import { toast } from "sonner";

const VendorRequestCard = ({ data, refetch }) => {
    const { _id, owner_name, owner_email, vendor_name, logo, banner, status } = data

    const [processing, setProcessing] = useState(false)

    const axios = UseAxios()

    const handleAction = async (action) => {
        if (processing) {
            return;
        }

        setProcessing(true)
        const toastId = toast.loading("Processing...")
        try {
            // change the request status
            const { data: updateData } = await axios.put("/req/process", { id: _id, status: action })

            // if accepted creat add new vendor

            if (action === "accepted") {
                const vendorData = {
                    owner_name,
                    owner_email,
                    vendor_name,
                    logo,
                    banner,
                    varyfied: true,
                    likedBy: []
                }
                await axios.post("/new/vendor", vendorData)

                await axios.put("/user/role", { email: owner_email, role: "vendor" })
            }

            toast.dismiss(toastId)
            toast.success("Successfull")
            refetch()
        }

        catch (err) {
            console.log(err);
            toast.dismiss(toastId)
            toast.error("Something went wrong")
            setProcessing(false)
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

