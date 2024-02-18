import "./Comments.css";
import CommentsCards from "../../Cards/CommentsCards/CommentsCards";
import UseAxios from "../../Hooks & Functions/useAxios";
import { useQuery } from "@tanstack/react-query";

const Comments = ({ vendor_id }) => {

    const axios = UseAxios()

    const { data } = useQuery({
        queryKey: ["comments"],
        queryFn: async () => {
            const { data: res } = await axios.get(`/comments?vendor_id=${vendor_id}`)
            return res
        }
    })

    return (
        <div className="comments_wrapper">


            <div className="comments_container">
                {
                    data?.map(comment => <CommentsCards key={comment._id} comment_data={comment} />)
                }
            </div>


        </div>
    );
};

export default Comments;