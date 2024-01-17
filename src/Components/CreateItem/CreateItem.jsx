import "./CreateItem.css";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";

const CreateItem = () => {

    const [showForm, setShowForm] = useState(false)
    const [chategory, setChategory] = useState("Select Chategory")


    const handleAddItem = async (e) => {
        e.preventDefault()
        const form = e.form
        const name = form.name.value
        const price = form.price

    }


    return (
        <>
            <div className="create_item_container" onClick={() => setShowForm(true)}>
                <div className="plusIcon">
                    <GoPlus />
                </div>
                <h1>Add a New Item</h1>
                <div className="fill"></div>
            </div>
            {

                showForm ?
                    <div className="itemForm">
                        <form>
                            <div>
                                <p>Item Name</p>
                                <input type="text" name="name" required placeholder="Yummy food" />
                            </div>

                            <div>
                                <p>Item Image</p>
                                <input type="file" accept="*/image" name="image" required className="image" />
                            </div>

                            <div className="bro">
                                <div>
                                    <p>Item Price</p>
                                    <input type="number" name="price" required placeholder="500" />
                                </div>

                                <div>
                                    <p>Chategory</p>

                                    <select value={chategory} onChange={(e) => setChategory(e.target.value)}>
                                        <option value="Select Chategory">Select Chategory</option>
                                        <option value="biryani">Biryani</option>
                                        <option value="pizza">Burger</option>
                                        <option value="kebab">Kebab</option>
                                        <option value="momos">Momos</option>
                                        <option value="fried chicken">Fried Chicken</option>
                                    </select>

                                </div>
                            </div>

                            <div>
                                <p>Extimated Delivery Time (minutes)</p>
                                <input type="number" name="time" required placeholder="30" />
                            </div>
                            <div>
                                <p>Description</p>
                                <textarea name="description" required placeholder="Type here your ..." />
                            </div>

                            <button>Add Item</button>

                            <RxCross2 onClick={() => setShowForm(false)} />
                        </form>
                    </div>
                    : ""
            }



        </>

    );
};

export default CreateItem;