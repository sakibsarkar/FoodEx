import "./ManageShop.css";
import CreateItem from "../../../Components/CreateItem/CreateItem";

const ManageShop = () => {
    return (
        <div className="manage_shop_container">
            <h1>You shop</h1>
            <div className="my_items">
                <CreateItem />
            </div>

        </div>
    );
};

export default ManageShop;