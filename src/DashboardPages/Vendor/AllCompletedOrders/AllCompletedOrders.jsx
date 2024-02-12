import "./AllCompletedOrders.css";
import CompletedOrderCard from "../../../Cards/CompletedOrderCard/CompletedOrderCard";
import UseAxios from "../../../Hooks & Functions/useAxios";
import { useQuery } from "@tanstack/react-query";

const AllCompletedOrders = () => {

    const axios = UseAxios()

    const { data } = useQuery({
        queryKey: ["completedOrders"],
        queryFn: async () => {
            const { data: res } = await axios.get("/my-states")
            return res
        }
    })



    return (
        <div className="complete_order_page_container">
            <h1>All Completed Orders</h1>
            <div className="complete_order_container">
                {
                    data?.map((order) => <CompletedOrderCard key={order?._id} data={order} />)
                }

            </div>
        </div>
    );
};

export default AllCompletedOrders;

