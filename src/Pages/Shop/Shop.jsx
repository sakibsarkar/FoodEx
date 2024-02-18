import "./Shop.css";
import CartDisplay from "../../Components/CartDisplay/CartDisplay";
import Comments from "../../Components/Comments/Comments";
import ItemsCard from "../../Cards/ItemsCard/ItemsCard";
import UseAxios from "../../Hooks & Functions/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Mycontext } from "../../Authcontext/Authcontext";

const Shop = () => {
    const { cart, setCart } = useContext(Mycontext)

    const { vendor_id } = useParams()

    // clearing the cart for previous item from different vendor
    useEffect(() => {
        const cartFirstItem = cart[0] || {}
        if (cartFirstItem.vendor_id && (cartFirstItem?.vendor_id !== vendor_id)) {
            setCart([])
        }
    }, [vendor_id, setCart, cart])

    // window.scroll(0, 0)

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
        <div className="shop_wrapper_class">
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

            <Comments vendor_id={vendor_id} />
        </div>
    );
};

export default Shop;