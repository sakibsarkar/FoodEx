import "./CommentsCards.css";
import ReactStars from "react-rating-stars-component";
import UpdateComment from "../../Components/UpdateComment/UpdateComment";
import { useContext, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { Mycontext } from "../../Authcontext/Authcontext";

const CommentsCards = ({ comment_data, refetch }) => {
    const [show, setShow] = useState(false)
    const { user } = useContext(Mycontext)

    const { _id, name, email, photo, ratings, comment, shop_id, visible } = comment_data

    const img = photo || "https://www.mgp.net.au/wp-content/uploads/2023/05/150-1503945_transparent-user-png-default-user-image-png-png.png"

    const isMyComment = user?.email === email


    // update form show
    const handleShow = () => {
        setShow(true)
        document.documentElement.classList.add("no_scroll")
    }

    return (
        <div className="comment_box">

            <div className="comment_row">

                <div className="img">
                    <img src={img} alt="" />
                </div>

                <div className="comment_col">
                    <p>{name}</p>
                    <ReactStars
                        count={ratings}
                        edit={false}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        size={18}
                        isHalf={true}
                        activeColor="#ffd700"
                    />
                </div>

            </div>

            <p>{comment}</p>

            {
                isMyComment ?
                    <div className="comment_action">
                        <button
                            style={{ background: "#2dbf1a" }}
                            onClick={handleShow}
                        >
                            <MdModeEditOutline />
                        </button>

                        <button style={{ background: "#f15858" }}>
                            <FaRegTrashAlt />
                        </button>


                    </div>
                    :
                    ""
            }

            {
                show ?
                    <UpdateComment
                        refetch={refetch}
                        comment={comment}
                        comment_id={_id}
                        setShow={setShow}
                        show={show} />
                    :
                    ""
            }

        </div>
    );
};

export default CommentsCards;