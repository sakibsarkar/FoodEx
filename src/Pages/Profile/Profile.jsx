import "./Profile.css";
import Swal from "sweetalert2";
import UseAxios from "../../Hooks & Functions/useAxios";
import { useQuery } from "@tanstack/react-query";
import { getAuth, updateProfile } from "firebase/auth";
import { useContext, useState } from "react";
import { LuPencil } from "react-icons/lu";
import { LuPen } from "react-icons/lu";
import { SlLogout } from "react-icons/sl";
import { toast } from "sonner";
import { Mycontext } from "../../Authcontext/Authcontext";
import { errorSound } from "../../Hooks & Functions/errorAudio";
import { uploadImg } from "../../Hooks & Functions/uploadImg";

const Profile = () => {
    const { user, logOut, setUser } = useContext(Mycontext)

    const axiosPrivate = UseAxios()

    const [showForm, setShowForm] = useState(false)

    const [PendingOrders, setPendingOrders] = useState([])
    const [completedOrders, setCompletedFulOrders] = useState([])

    const { data = [], isLoading } = useQuery({
        queryKey: ["order_states"],
        queryFn: async () => {
            const { data: result } = await axiosPrivate.get("/orderHistory")
            const pendingOrders = result?.filter(order => order.order_status === "pending")
            const completedOrders = result?.filter(order => order.order_status === "completed")
            setPendingOrders(pendingOrders)
            setCompletedFulOrders(completedOrders)
            return result
        }
    })

    const handleLogout = () => {
        Swal.fire({
            title: "Do you want to Logout",
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No,`
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                logOut()
                await axiosPrivate.post("/logout")
                Swal.fire("Successfully loged out", "", "success");
            } else if (result.isDenied) {
                return
            }
        });
    }



    const handleUpdateDisplayImg = async (e) => {
        const img = e?.target?.files[0] || ""

        if (!img) {
            return toast.error("Please select a valid image")
        }

        const toastId = toast.loading("Please wait")


        try {
            const auth = getAuth()


            const { data } = await uploadImg(img)
            await updateProfile(auth.currentUser, {
                photoURL: data?.display_url
            })


            // to show the updated profile img
            let userReplica = { ...user }
            userReplica.photoURL = data?.display_url
            setUser(userReplica)


            toast.dismiss(toastId)
            toast.success("Photo updated")
        }

        catch {
            errorSound()
            toast.dismiss(toastId)
            toast.error("Something went wrong", {
                description: "Please refresh this page and try again"
            })
        }
    }



    const handleUpdateDisplayName = async (e) => {
        e.preventDefault()
        const nameValue = e.target.userName.value || ""
        const prevName = user?.displayName || ""

        if (!nameValue) return toast.error("Please enter Your name")

        if (nameValue === prevName) return toast.error("Please enter a new name")

        const toastId = toast.loading("Please wait a momment")
        try {
            const auth = getAuth()



            await updateProfile(auth.currentUser, {
                displayName: nameValue
            })


            // to show the updated profile img
            let userReplica = { ...user }
            userReplica.displayName = nameValue
            setUser(userReplica)

            setShowForm(false)
            toast.dismiss(toastId)
            toast.success("User name updated")
        }

        catch {
            errorSound()
            toast.dismiss(toastId)
            toast.error("Something Went Wrong Please try again")
        }


    }


    return (
        <>

            <div className="profile_container">
                <div className="bg_graphic">

                    <div className="profile_card">

                        <label htmlFor="imgFeild" className="user_profile_img" >
                            <img src={user?.photoURL} alt="" />
                            <button className="profile_update_btn" >
                                <LuPen />
                            </button>

                            <input style={{ display: "none" }} type="file" accept="image/*" id="imgFeild" onChange={handleUpdateDisplayImg} />
                        </label>

                        <div className="userDetails">
                            <h2 className="userName" onClick={() => setShowForm(true)}>
                                {user?.displayName || "unknown"}
                                <LuPencil />
                            </h2>

                            <div className="orderStates">

                                <div className="stateBox">
                                    <h2>{data?.length || 0}</h2>
                                    <p>Total Order</p>
                                </div>

                                <div className="stateBox">
                                    <h2>{completedOrders?.length || 0}</h2>
                                    <p>Completed Orders</p>
                                </div>

                                <div className="stateBox">
                                    <h2>{PendingOrders?.length || 0}</h2>
                                    <p>Pending Orders</p>
                                </div>
                            </div>

                        </div>

                        <button className="logOut_btn" onClick={handleLogout}><SlLogout /> Logout</button>


                    </div>

                </div>
            </div>



            {
                showForm ?
                    <div className="profile_update">
                        <form onSubmit={handleUpdateDisplayName}>
                            <div>
                                <p>User name</p>
                                <input type="text" name="userName" id="" defaultValue={user?.displayName || ""} />
                            </div>

                            <div style={{ flexDirection: "row" }}>
                                <button type="reset" style={{ background: "#6d757a" }}
                                    onClick={() => setShowForm(false)}>Cancel</button>

                                <button type="submit" style={{ background: "#da1481" }}>Update</button>
                            </div>
                        </form>
                    </div>
                    :
                    ""
            }

        </>
    );
};

export default Profile;

