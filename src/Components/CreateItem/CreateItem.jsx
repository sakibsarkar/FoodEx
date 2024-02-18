import "./CreateItem.css";
import UseAxios from "../../Hooks & Functions/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { GoPlus } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";
import { Mycontext } from "../../Authcontext/Authcontext";
import { errorSound } from "../../Hooks & Functions/errorAudio";
import { uploadImg } from "../../Hooks & Functions/uploadImg";

const CreateItem = ({ refetch }) => {

    const { user } = useContext(Mycontext)

    const [showForm, setShowForm] = useState(false)
    const [category, setCategory] = useState("Select Chategory")

    const axios = UseAxios()
    const { data: shopData = {} } = useQuery({
        queryKey: ["myshop"],
        queryFn: async () => {
            const { data: result } = await axios.get(`/myshop?email=${user?.email}`)
            return result
        }
    })

        ;

    const handleAddItem = async (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const price = form.price.value
        const image = form.image.files[0]
        const description = form.description.value
        const delivery_time = form.time.value

        const toastId = toast.loading("Please wait a moment...")
        try {
            const { data } = await uploadImg(image)
            const objData = {
                image: data?.display_url,
                name,
                price: parseInt(price),
                category,
                vendor_name: shopData?.vendor_name,
                vendor_id: shopData?._id,
                vendor_email: user?.email,
                description,
                delivery_time: parseInt(delivery_time)

            }

            await axios.post("/add/item", objData)
            toast.dismiss(toastId)
            toast.success("Successfulyy added")
            setShowForm(false)
            refetch()

        }

        catch (err) {
            errorSound()
            toast.dismiss(toastId)
            toast.error("Something went wrong")
            console.log(err);
        }

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
                        <form onSubmit={handleAddItem}>
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

                                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                        <option value="Select Chategory">Select Chategory</option>
                                        <option value="biryani">Biryani</option>
                                        <option value="pizza">Pizza</option>
                                        <option value="burger">Burger</option>
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