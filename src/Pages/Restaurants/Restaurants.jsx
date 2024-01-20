import "./Restaurants.css";
import RestaurantCard from "../../Cards/RestaurantCard/RestaurantCard";
import UseAxios from "../../Hooks & Functions/useAxios";
import { useQuery } from "@tanstack/react-query";

const Restaurants = () => {

    const axios = UseAxios()
    const { data } = useQuery({
        queryKey: ["all shop"],
        queryFn: async () => {
            const { data: result } = await axios.get("/all/shop")
            return result

        }
    })



    return (
        <div className="restaurant_container">
            <h1>Eat from your fav Restaurants</h1>
            <div className="restaurant_cards_con">
                {
                    data?.map(item => <RestaurantCard key={item._id} item={item} />)
                }
            </div>
        </div>
    );
};

export default Restaurants;