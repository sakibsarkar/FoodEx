import "./ManageShop.css";
import CreateItem from "../../../Components/CreateItem/CreateItem";
import MyItems from "../../../Components/MyItems/MyItems";
import ProductSkeleton from "../../../Components/ProductSkeleton/ProductSkeleton";
import UseAxios from "../../../Hooks & Functions/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Mycontext } from "../../../Authcontext/Authcontext";

const ManageShop = () => {
    const { user } = useContext(Mycontext)
    const axios = UseAxios()
    const { data, refetch, isLoading } = useQuery({
        queryKey: ["my_items"],
        queryFn: async (req, res) => {
            const { data: item } = await axios.get(`/my_items?email=${user?.email}`)
            return item
        }
    })



    return (
        <div className="manage_shop_container">
            <h1>You shop</h1>
            <div className="my_items">
                <CreateItem refetch={refetch} />

                {
                    isLoading ?
                        <>
                            <ProductSkeleton />
                            <ProductSkeleton />
                            <ProductSkeleton />
                            <ProductSkeleton />
                            <ProductSkeleton />
                            <ProductSkeleton />
                            <ProductSkeleton />
                        </>
                        :
                        <>
                            {data?.map(item => <MyItems key={item._id} item={item} refetch={refetch} />)}
                        </>
                }
            </div>

        </div>
    );
};

export default ManageShop;