import "./AllFoods.css";
import FoodCard from "../../Cards/FoodCard/FoodCard";
import MultiRangeSlider from "multi-range-slider-react";
import ProductSkeleton from "../../Components/ProductSkeleton/ProductSkeleton";
import UseAxios from "../../Hooks & Functions/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";

const AllFoods = () => {

    const category = ["All", "Biryani", "Burger", "Pizza", "Momos", "Kebab"]
    const deliveryTimes = ["All", 15, 30, 45, 60]

    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedTime, setSelectedTime] = useState("All")
    const [minValue, set_minValue] = useState(0);
    const [maxValue, set_maxValue] = useState(1000);
    const axios = UseAxios()

    const { data = [], isLoading } = useQuery({
        queryKey: ["allfoods", selectedCategory, maxValue, minValue, selectedTime],
        queryFn: async () => {
            const { data: foodData } = await axios.get(`/allfoods?limit=${12}&&currentPage=${0}&&category=${selectedCategory}&&min=${minValue}&&max=${maxValue}&&time=${selectedTime}`)
            return foodData
        }
    })



    const handleInput = (e) => {
        set_minValue(e.minValue);
        set_maxValue(e.maxValue);
    };


    return (
        <div className="allFoodContainer">


            <div className="filterBar">
                <h2><FaFilter />Filter</h2>

                <div className="categoryFilterBox">
                    <h2>Chagory</h2>

                    <div>
                        {category.map((item, index) => <button key={index}
                            onClick={() => setSelectedCategory(item)}
                            className={selectedCategory === item ? "categorySelected" : ""}
                        >{item}</button>)}
                    </div>

                </div>

                <div className="priceRange">
                    <h2>Price Range <span>৳{minValue} - {maxValue}</span></h2>
                    <MultiRangeSlider
                        min={0}
                        max={2000}
                        step={5}
                        minValue={minValue}
                        maxValue={maxValue}
                        onInput={(e) => {
                            handleInput(e);
                        }}
                        style={{ border: "none", boxShadow: "none", padding: "15px 10px" }}
                        ruler={false}
                        thumbLeftColor="#da1481"
                        thumbRightColor="#da1481"
                        barInnerColor="#da1481"
                        barLeftColor="#e4e4e4"
                        barRightColor="#e4e4e4"

                    />
                </div>

                <div className="deliveryTimes">
                    <h2>Delivery within</h2>
                    <div>
                        {
                            deliveryTimes.map((time, index) => <button
                                key={index}
                                className={selectedTime === time ? "timeSelected" : ""}
                                onClick={() => setSelectedTime(time)}
                            >{time} {time !== "All" && "min"}</button>)
                        }
                    </div>
                </div>


            </div>

            <div className="foodsContainer">

                {

                    isLoading ?
                        <>
                            <ProductSkeleton />
                            <ProductSkeleton />
                            <ProductSkeleton />
                            <ProductSkeleton />
                            <ProductSkeleton />
                            <ProductSkeleton />
                        </>
                        :
                        <>
                            {
                                data?.length == 0
                                &&
                                <div className="no-data">
                                    <img src="https://i.ibb.co/XZYn8CV/nodata.png" alt="" draggable={false} />
                                    <h1>Opps ! Sorry we don't have any data for this.</h1>
                                </div>
                            }

                            {
                                data?.map(item => <FoodCard key={item._id} data={item} />)
                            }

                        </>

                }
            </div>
        </div>
    );
};

export default AllFoods;

