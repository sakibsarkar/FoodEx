import "./VendorReq.css";
import UseAxios from "../../Hooks & Functions/useAxios";
import VendorRequestCard from "../../Cards/VendorRequestCard/VendorRequestCard";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const VendorReq = () => {

    const [status, setStatus] = useState("Pending")

    const axios = UseAxios()
    const { data } = useQuery({
        queryKey: ["allReq", status],
        queryFn: async () => {
            const { data: request } = await axios(`/all/req?status=${status}`)
            return request
        }
    })

    const statusArr = ["Pending", "Accepted", "Rejected"]
    return (
        <div className="reqBoxContainer">
            <h1>All {status} Requests</h1>
            <div className="requestContainer">
                <div className="statusBox">
                    {statusArr.map((stat, index) => <button
                        key={index}
                        onClick={() => setStatus(stat)}
                        className={status === stat ? "activeStatus" : ""}
                    >{stat}</button>)}
                </div>

                <div className="requests">
                    {
                        data?.map(req => <VendorRequestCard key={req._id} data={req} />)
                    }
                    {
                        data?.map(req => <VendorRequestCard key={req._id} data={req} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default VendorReq;