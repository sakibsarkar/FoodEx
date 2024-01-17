import "./VendorReq.css";
import UseAxios from "../../../Hooks & Functions/useAxios";
import VendorRequestCard from "../../../Cards/VendorRequestCard/VendorRequestCard";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaHandshake } from "react-icons/fa";
import { MdOutlineCancelPresentation, MdOutlinePendingActions } from "react-icons/md";

const VendorReq = () => {

    const [status, setStatus] = useState("Pending")

    const axios = UseAxios()
    const { data, refetch } = useQuery({
        queryKey: ["allReq", status],
        queryFn: async () => {
            const { data: request } = await axios(`/all/req?status=${status}`)
            return request
        }
    })

    const statusArr = ["Pending", "Accepted", "Rejected"]
    const StatIcons = [<MdOutlinePendingActions key={"pending"} />, <FaHandshake key={"handshake"} />, <MdOutlineCancelPresentation key={"cancel"} />]


    return (
        <div className="reqBoxContainer">
            <h1>All {status} Requests</h1>
            <div className="requestContainer">
                <div className="statusBox">
                    {statusArr.map((stat, index) => (
                        <button
                            key={index}
                            onClick={() => setStatus(stat)}
                            className={status === stat ? "activeStatus" : ""}
                        >
                            {StatIcons[index]} {stat}
                        </button>
                    ))}
                </div>

                <div className="requests">
                    {
                        data?.map(req => <VendorRequestCard
                            key={req._id}
                            data={req}
                            refetch={refetch}

                        />)
                    }
                </div>
            </div>
        </div>
    );
};

export default VendorReq;