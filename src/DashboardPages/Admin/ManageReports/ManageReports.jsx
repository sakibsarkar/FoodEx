import "./ManageReports.css";
import UseAxios from "../../../Hooks & Functions/useAxios";
import { useQuery } from "@tanstack/react-query";

const ManageReports = () => {
    const axios = UseAxios()
    const { data = [] } = useQuery({
        queryKey: ["reports"],
        queryFn: async () => {
            const { data: res } = await axios.get("/reports")
            return [...res].reverse()
        }
    })


    const hanldeSlice = (string) => {
        return string.substring(0, 40) + "..."
    }


    return (
        <div className="report_manager">

            <table>
                <thead>
                    <tr>
                        <td>Sl.</td>
                        <td>Repoted By</td>
                        <td>Comment</td>
                        <td>Reason</td>
                        <td>Action</td>
                    </tr>
                </thead>

                <tbody>
                    {
                        data?.map((rep, index) => <tr key={rep._id}>
                            <td>{index + 1}</td>
                            <td>{rep.reportedBy}</td>
                            <td>{hanldeSlice(rep.comment)}</td>
                            <td><button>View Reason</button></td>
                            <td>View details</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ManageReports;