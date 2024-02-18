import "./UpdateComment.css";
import UseAxios from "../../Hooks & Functions/useAxios";
import sound from "../../assets/sound.mp3";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";
import { errorSound } from "../../Hooks & Functions/errorAudio";

const UpdateComment = ({ comment, comment_id, setShow, show, refetch }) => {
    const axios = UseAxios()
    const hanldeSubmitUpdate = async (e) => {
        e.preventDefault()

        // audio function
        let audio = new Audio()
        audio.src = sound

        const form = e.target;
        const newComment = form.update.value;
        if (comment === newComment) return toast.error("You didn't update anything")

        const toastId = toast.loading("Please wait")

        try {
            await axios.put(`/comment?comment_id=${comment_id}`, { comment: newComment })

            // remove no scroll class from the body
            document.documentElement.classList.remove("no_scroll")



            audio.play()
            setShow(false)
            toast.dismiss(toastId)
            toast.success("Successfuly updated your comment")
            refetch()
        }
        catch (err) {
            errorSound()
            toast.dismiss(toastId)
            toast.error("Something went wrong")
            console.log(err);
        }


    }


    const handleCancel = () => {
        // remove no scroll class from the body
        document.documentElement.classList.remove("no_scroll")

        setShow(false)
    }

    return (
        <div className="comment_update_container">
            <form onSubmit={hanldeSubmitUpdate} >
                <div className="cross" onClick={handleCancel}>
                    <RxCross2 />
                </div>
                <p>Update your comment</p>
                <textarea defaultValue={comment} name="update" />
                <button>Update now</button>
            </form>
        </div>
    );
};

export default UpdateComment;

