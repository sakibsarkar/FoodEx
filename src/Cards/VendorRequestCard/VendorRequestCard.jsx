import "./VendorRequestCard.css";
import { FaHandshake } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { TfiEmail } from "react-icons/tfi";

const VendorRequestCard = ({ data }) => {
    const { _id, owner_name, owner_email, vendor_name, logo, banner, status } = data
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
                <button><RxCrossCircled />Reject</button>
                <button style={{ background: "#1f68ff", color: "white" }}><FaHandshake />Accept</button>
            </div>

        </div>
    );
};

export default VendorRequestCard;

