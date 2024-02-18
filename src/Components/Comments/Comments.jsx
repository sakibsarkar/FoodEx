import "./Comments.css";
import CommentsCards from "../../Cards/CommentsCards/CommentsCards";
import PostComment from "../PostComment/PostComment";
import UseAxios from "../../Hooks & Functions/useAxios";
import { useQuery } from "@tanstack/react-query";

const Comments = ({ vendor_id }) => {

    const axios = UseAxios()

    const { data, refetch } = useQuery({
        queryKey: ["comments"],
        queryFn: async () => {
            const { data: res } = await axios.get(`/comments?vendor_id=${vendor_id}`)
            return [...res].reverse()
        }
    })

    return (
        <div className="comments_wrapper">

            <PostComment refetch={refetch} shopId={vendor_id} />

            <div className="comments_container">
                {
                    data?.map(comment => <CommentsCards key={comment._id} comment_data={comment} />)
                }
            </div>
        </div>
    );
};

export default Comments;