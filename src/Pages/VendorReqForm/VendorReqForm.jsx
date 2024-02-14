import "./VendorReqForm.css";
import Swal from "sweetalert2";
import UseAxios from "../../Hooks & Functions/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Mycontext } from "../../Authcontext/Authcontext";
import { uploadImg } from "../../Hooks & Functions/uploadImg";

const VendorReqForm = () => {
    const { user } = useContext(Mycontext)
    const axios = UseAxios()


    // check for reqStatus
    const { data = {}, isLoading } = useQuery({
        queryKey: ["reqCheck"],
        queryFn: async (req, res) => {
            const { data: reqData } = await axios.get("/my_request")
            return reqData
        }
    })


    const handleSubmit = (e) => {

        e.preventDefault()
        const form = e.target
        const vendor_name = form.shopName.value
        const logo = form.logo.files[0]
        const banner = form.banner.files[0]
        Swal.fire({

            title: "Do you want to Logout",
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No,`
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                const { data: logoURL } = await uploadImg(logo)
                const { data: bannerURL } = await uploadImg(banner)

                const vendorObj = {
                    owner_name: user?.displayName,
                    owner_email: user?.email,
                    vendor_name: vendor_name,
                    logo: logoURL?.display_url,
                    banner: bannerURL?.display_url,
                    status: "pending"
                }

                const { data } = await axios.post("/vendor/request", vendorObj)

                Swal.fire("Successfully loged out", "", "success");
            } else if (result.isDenied) {

                return
            }
        });
    }

    return (
        <div className="reqFormContainer">
            {
                data.isExist ?
                    <div className="alreadyRequested">
                        <img src="https://i.ibb.co/PN7JC8y/Work-time-pana-removebg-preview.png" alt="" />
                        <h1>Your request is uder Pending</h1>
                        <button>My submission</button>
                    </div>

                    :

                    <>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <h2>Your name</h2>
                                <input type="text" defaultValue={user?.displayName} readOnly style={{ background: "#e6e6e6d6" }} />
                            </div>
                            <div>
                                <h2>Your email</h2>
                                <input type="text" defaultValue={user?.email} readOnly
                                    style={{ background: "#e6e6e6d6" }} />
                            </div>
                            <div>
                                <h2>Your Restaurant name</h2>
                                <input type="text" required name="shopName" />
                            </div>

                            <div>
                                <h2>Restaurant logo</h2>
                                <input type="file" accept="image/*" required
                                    style={{ height: "44px", paddingTop: "21px" }}
                                    name="logo"
                                />
                            </div>
                            <div>
                                <h2>Restaurant Banner</h2>
                                <input type="file" accept="*/image"
                                    style={{ height: "74px", paddingTop: "47px" }} required name="banner" />
                            </div>
                            <button type="submit">Submit</button>
                        </form>

                        <div className="inspireBox">
                            <img src="https://i.ibb.co/grzZmNX/become-vendor.png" alt="" />
                            <h1>Become a Vendor <br /> and Start earing with us</h1>
                        </div>

                    </>
            }
        </div>
    );
};

export default VendorReqForm;