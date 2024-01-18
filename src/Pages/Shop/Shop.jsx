import "./Shop.css";
import CartDisplay from "../../Components/CartDisplay/CartDisplay";
import ItemsCard from "../../Cards/ItemsCard/ItemsCard";
import UseAxios from "../../Hooks & Functions/useAxios";
import { useQuery } from "@tanstack/react-query";
import { iterate } from "localforage";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Shop = () => {
    const { vendor_id } = useParams()

    const [selectedCategory, setSelectedCategory] = useState("All")

    const axios = UseAxios()
    const category = ["All", "Biryani", "Burger", "Pizza", "Momos", "Kebab"]

    const { data: shopData = {} } = useQuery({
        queryKey: [vendor_id],
        queryFn: async () => {
            const { data: result } = await axios(`/shop?vendor_id=${vendor_id}`)
            return result
        }
    })


    const { data: items } = useQuery({
        queryKey: ["vendorItem", selectedCategory],
        queryFn: async () => {
            const { data: itemResult } = await axios.get(`/shop_items?category=${selectedCategory}&&id=${vendor_id}`)

            return itemResult
        }
    })



    return (
        <div className="shopContainer">
            <div className="shop_wrapper">

                <div className="hero_wrapper">
                    <div className="shop_banner">
                        <img src={shopData?.banner} />
                    </div>

                    <div className="hero_row">
                        <div className="logo">
                            <img src={shopData?.logo} alt="" />
                        </div>
                        <h1>{shopData?.vendor_name}</h1>
                    </div>

                    <div className="available_category">
                        {category.map((cat, index) => <button
                            key={index}
                            onClick={() => setSelectedCategory(cat)}
                            className={cat === selectedCategory ? "active" : ""}
                        >{cat}</button>)}
                    </div>
                </div>

                <div className="vendor_items">
                    {
                        items?.map((item) => <ItemsCard key={item._id} data={item} />)
                    }
                </div>

            </div>

            <CartDisplay />
        </div>
    );
};

export default Shop;