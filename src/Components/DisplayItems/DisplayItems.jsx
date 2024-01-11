import "./DisplayItems.css";
import FoodCard from "../../Cards/FoodCard/FoodCard";

const DisplayItems = ({ heading, itemData = [] }) => {


    return (
        <div className="displayItemContainer">
            <h1>{heading}</h1>
            <div className="itemContainer">
                {itemData?.map(item => <FoodCard key={item._id} data={item} />)}
                {itemData?.map(item => <FoodCard key={item._id} data={item} />)}
                {itemData?.map(item => <FoodCard key={item._id} data={item} />)}
                {itemData?.map(item => <FoodCard key={item._id} data={item} />)}
            </div>
        </div>
    );
};

export default DisplayItems;