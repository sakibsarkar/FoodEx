import "./AllFoods.css";
import FoodCard from "../../Cards/FoodCard/FoodCard";
import UseAxios from "../../Hooks & Functions/useAxios";
import { useQuery } from "@tanstack/react-query";

const AllFoods = () => {

    const axios = UseAxios()

    const { data } = useQuery({
        queryKey: ["allfoods"],
        queryFn: async () => {
            const { data: foodData } = await axios.get(`/allfoods?limit=${12}&&currentPage=${0}`)
            return foodData
        }
    })



    return (
        <div className="allFoodContainer">
            <div className="foodsContainer">
                {
                    data?.map(item => <FoodCard key={item._id} data={item} />)
                }
            </div>
        </div>
    );
};

export default AllFoods;

