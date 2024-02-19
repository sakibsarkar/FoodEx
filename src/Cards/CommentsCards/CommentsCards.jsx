import "./CommentsCards.css";
import PostReport from "../../Components/PostReport/PostReport";
import ReactStars from "react-rating-stars-component";
import Swal from "sweetalert2";
import UpdateComment from "../../Components/UpdateComment/UpdateComment";
import UseAxios from "../../Hooks & Functions/useAxios";
import sound from "../../assets/delete.mp3";
import success from "../../assets/success.mp3";
import { useContext, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiWarning } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { toast } from "sonner";
import { Mycontext } from "../../Authcontext/Authcontext";
import { errorSound } from "../../Hooks & Functions/errorAudio";

const CommentsCards = ({ comment_data, refetch }) => {


    // show update form
    const [show, setShow] = useState(false)

    // show commnet actions
    const [showActions, setShowActions] = useState(false)

    // show report form
    const [showReportForm, setShowReportForm] = useState(false)


    const { user } = useContext(Mycontext)

    const axios = UseAxios()

    const { _id, name, email, photo, ratings, comment, shop_id, visible } = comment_data

    const img = photo || "https://www.mgp.net.au/wp-content/uploads/2023/05/150-1503945_transparent-user-png-default-user-image-png-png.png"

    const isMyComment = user?.email === email





    // show update form
    const handleShow = () => {
        setShow(true)
        setShowActions(false)
        document.documentElement.classList.add("no_scroll")
    }


    // show report form
    const handleReportShow = () => {
        setShowReportForm(true)
        setShowActions(false)
    }


    // delte comment
    const handleDelete = async () => {
        let audio = new Audio()
        audio.src = sound

        const result = await Swal.fire({
            title: "Do you want to delete your commnet",
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`
        })

        if (result.isConfirmed) {
            setShowActions(false)
            await axios.delete(`/comment?comment_id=${_id}`)
            audio.play()
            refetch()
            toast.success("Delete successful")
        }

        else {
            return setShowActions(false)
        }
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

            <div className="comment_action">

                <button onClick={() => setShowActions(!showActions)}>
                    <BsThreeDotsVertical />
                </button>

                {
                    showActions ?
                        <div className="action_slide">
                            {
                                isMyComment ?
                                    <>
                                        <button onClick={handleDelete}><FaRegTrashAlt />Delete</button>
                                        <button onClick={handleShow}><MdModeEditOutline />Update</button>
                                    </>

                                    :

                                    <button onClick={handleReportShow}><CiWarning />Report comment</button>
                            }

                        </div>


                        :
                        ""
                }

            </div>

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


            {
                showReportForm ?
                    <PostReport
                        comment_details={comment_data}
                        setShow={setShowReportForm}
                        show={showReportForm}
                    />
                    :
                    ""
            }

        </div>
    );
};

export default CommentsCards;