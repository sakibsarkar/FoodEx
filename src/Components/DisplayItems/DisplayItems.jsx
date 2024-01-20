import "./DisplayItems.css";
import FoodCard from "../../Cards/FoodCard/FoodCard";
import ProductSkeleton from "../ProductSkeleton/ProductSkeleton";

const DisplayItems = ({ heading, itemData = [], isLoading }) => {


    return (
        <div className="displayItemContainer">
            <h1>{heading}</h1>
            <div className="itemContainer">
                {
                    isLoading ?
                        <>
                            <ProductSkeleton />
                            <ProductSkeleton />
                            <ProductSkeleton />
                            <ProductSkeleton />

                        </>
                        :
                        <>
                            {itemData?.map(item => <FoodCard key={item._id} data={item} />)}
                        </>

                }
            </div>
        </div>
    );
};

export default DisplayItems;