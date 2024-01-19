import "./OrderHistory.css";
import OrderHistoryCard from "../../Cards/OrderHistoryCar/OrderHistoryCard";
import OrderHistorySkeleton from "../../Components/OrderHistorySkeleton/OrderHistorySkeleton";
import UseAxios from "../../Hooks & Functions/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";

const OrderHistory = () => {
    const axios = UseAxios()
    const [shouldOpen, setShouldOpen] = useState("")
    const { data = [{}], isLoading } = useQuery({
        queryKey: ["ordeHistory"],
        queryFn: async () => {
            const { data: result } = await axios.get("/orderHistory")
            setShouldOpen(result[0]?._id ? result[0]._id : "")
            return result
        }
    })

    return (<div className="order_history_container">

        <div className="history_cards_container">
            {
                isLoading ?
                    <>
                        <OrderHistorySkeleton />
                        <OrderHistorySkeleton />
                        <OrderHistorySkeleton />
                    </>
                    :
                    <>

                        {
                            data?.map(item => <OrderHistoryCard
                                key={item._id}
                                data={item}
                                shouldOpen={shouldOpen}
                                setShouldOpen={setShouldOpen}
                            />)
                        }
                    </>
            }



        </div>

        {
            data?.length < 1 ?
                <div className="no_data">
                    <img src="https://i.ibb.co/1s3smht/Shared-goals-bro-removebg-preview.png" alt="" />
                    <h2>You have't order anything yet</h2>
                    <Link to="/delivery">Lets eat</Link>
                </div>
                : ""
        }
    </div>
    );
};

export default OrderHistory;