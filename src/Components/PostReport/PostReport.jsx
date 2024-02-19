import "./PostReport.css";
import UseAxios from "../../Hooks & Functions/useAxios";
import sound from "../../assets/success.mp3";
import { useContext } from "react";
import { toast } from "sonner";
import { Mycontext } from "../../Authcontext/Authcontext";
import { errorSound } from "../../Hooks & Functions/errorAudio";

const PostReport = ({ comment_details, show, setShow }) => {

    const { user } = useContext(Mycontext)

    const axios = UseAxios()

    const hanldeReportComment = async (e) => {
        e.preventDefault()
        const reason = e.target.reason.value;
        if (reason.length < 50) {
            errorSound()
            return toast.error("Reason should be alteast 50 charecter.")
        }

        const toastId = toast.loading("Please wait a momment");

        let commentObj = {
            ...comment_details,
            reason,
            reportedBy: user?.email,
        }

        // deleteting "_id" from the object
        delete commentObj._id

        // adding "_id" as comment_id
        commentObj.comment_id = comment_details._id

        try {

            const { data } = await axios.post("/report/comment", commentObj)
            if (data.isExist) {
                setShow(false)
                errorSound()
                setShow(false)
                toast.dismiss(toastId);
                toast.error("You already reported this comment")
                return
            }

            toast.dismiss(toastId)

            toast.success("Thanks for reporting this comments");


            setShow(false)

            let audio = new Audio()
            audio.src = sound
            audio.play()
            setShow(false)
        }


        catch (err) {
            toast.dismiss(toastId)
            toast.error("Something went wrong")
            errorSound()
            console.log(err);
        }

    }


    const handleCancel = () => {
        setShow(false)
    }


    return (
        <form onSubmit={hanldeReportComment} className="report_form">
            <textarea name="reason" placeholder="Report reason" required />
            <div className="form_btns">
                <button type="button" onClick={handleCancel}>Cancel</button>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
};

export default PostReport;