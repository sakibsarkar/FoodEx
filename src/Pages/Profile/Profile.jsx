import "./Profile.css";
import UseAxios from "../../Hooks & Functions/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { LuPen } from "react-icons/lu";
import { SlLogout } from "react-icons/sl";
import { Mycontext } from "../../Authcontext/Authcontext";

const Profile = () => {
    const { user } = useContext(Mycontext)

    const axios = UseAxios()

    const [PendingOrders, setPendingOrders] = useState([])
    const [completedOrders, setCompletedFulOrders] = useState([])

    const { data = [], isLoading } = useQuery({
        queryKey: ["order_states"],
        queryFn: async () => {
            const { data: result } = await axios.get("/orderHistory")
            const pendingOrders = result?.filter(order => order.order_status === "pending")
            const completedOrders = result?.filter(order => order.order_status === "completed")
            setPendingOrders(pendingOrders)
            setCompletedFulOrders(completedOrders)
            return result
        }
    })


    return (
        <div className="profile_container">
            <div className="bg_graphic">

                <div className="profile_card">

                    <div className="user_profile_img">
                        <img src={user?.photoURL} alt="" />


                        <button className="profile_update_btn">
                            <LuPen />
                        </button>

                    </div>

                    <div className="userDetails">
                        <h2>{user?.displayName || "unknown"}</h2>

                        <div className="orderStates">

                            <div className="stateBox">
                                <h2>{data?.length || 0}</h2>
                                <p>Total Order</p>
                            </div>

                            <div className="stateBox">
                                <h2>{completedOrders?.length || 0}</h2>
                                <p>Completed Orders</p>
                            </div>

                            <div className="stateBox">
                                <h2>{PendingOrders?.length || 0}</h2>
                                <p>Pending Orders</p>
                            </div>
                        </div>

                    </div>

                    <button className="logOut_btn"><SlLogout /> Logout</button>


                </div>

            </div>
        </div>
    );
};

export default Profile;

