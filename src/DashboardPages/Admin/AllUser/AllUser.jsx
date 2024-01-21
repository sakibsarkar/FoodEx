import "./AllUser.css";
import UseAxios from "../../../Hooks & Functions/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IoCopyOutline } from "react-icons/io5";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";

const AllUser = () => {
    const axios = UseAxios()
    const [copiedText, copy] = useCopyToClipboard()
    const { data } = useQuery({
        queryKey: ["all user"],
        queryFn: async () => {
            const { data: result } = await axios.get("/all/user")
            return result
        }
    })

    const handleCopy = (text) => {
        copy(text)
        toast.success("Successfuly copied to your keyboard")
    }

    return (
        <div className="all_user_con">
            <table>

                <thead>
                    <tr>
                        <td>Sl.</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Role</td>
                    </tr>

                </thead>

                <tbody>
                    {
                        data?.map((user, index) => <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user?.user_name}</td>
                            <td onClick={() => handleCopy(user?.user_email)} className="userEmail">
                                {user?.user_email}<IoCopyOutline className={"copyIcon"} />
                            </td>
                            <td>{user?.role}</td>
                        </tr>)
                    }
                </tbody>

            </table>

        </div>
    );
};

export default AllUser;