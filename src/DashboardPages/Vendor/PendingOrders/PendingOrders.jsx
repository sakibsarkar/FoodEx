import "./PendingOrders.css";
import OrderCard from "../../../Components/OrderCard/OrderCard";
import UseAxios from "../../../Hooks & Functions/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Mycontext } from "../../../Authcontext/Authcontext";

const PendingOrders = () => {
    const { user } = useContext(Mycontext)

    const axios = UseAxios()
    const { data, refetch } = useQuery({
        queryKey: ["pendingorder"],
        queryFn: async () => {
            const { data: vendor } = await axios.get(`/myshop?email=${user?.email}`)
            const { data: orderData } = await axios.get(`/myPendings?vendor_id=${vendor?._id}`)
            return orderData
        }
    })



    return (
        <div className="pendings">

            <h1>Lets finish</h1>

            <div className="pendingContainer">
                {
                    data?.map(order => <OrderCard key={order._id} order={order} refetch={refetch} />)
                }
            </div>


        </div>
    );
};

export default PendingOrders;