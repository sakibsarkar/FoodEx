import "./PostComment.css";
import ReactStars from "react-rating-stars-component";
import UseAxios from "../../Hooks & Functions/useAxios";
import sound from "../../assets/sound.mp3";
import { Dialog, Transition } from "@headlessui/react";
import { useContext, useState } from "react";
import { Fragment } from "react";
import { toast } from "sonner";
import { Mycontext } from "../../Authcontext/Authcontext";
import { errorSound } from "../../Hooks & Functions/errorAudio";

const PostComment = ({ refetch, shopId }) => {

    const [show, setShow] = useState(false)
    const [ratingValue, setRatingValue] = useState(2.5)

    const { user } = useContext(Mycontext)
    const axios = UseAxios()

    const user_img = user?.photoURL || "https://www.mgp.net.au/wp-content/uploads/2023/05/150-1503945_transparent-user-png-default-user-image-png-png.png"


    const handleSubmit = async (e) => {
        e.preventDefault()
        let audio = new Audio()
        audio.src = sound
        if (!user) {
            return toast.error("You must have to logedin to comment")
        }

        const form = e.target
        const comment_value = form.comment.value
        const rating = ratingValue || 0;


        const commenObj = {
            name: user?.displayName,
            email: user?.email,
            photo: user?.photoURL,
            ratings: rating,
            comment: comment_value,
            shop_id: shopId,
            visible: true
        }

        try {
            await axios.post("/comments", commenObj)
            audio.play()
            setShow(false)
            toast.success("Thanks for your feedback")
            form.reset()
            refetch()
        }
        catch (err) {
            errorSound()
            setShow(false)
            toast.error("Something went wrong")
            console.log(err);
        }

    }

    const closeModal = () => {
        setShow(false)
    }

    const ratingChanged = (value) => {
        setRatingValue(value)
    }


    return (
        <div className="comment_post_wrapper">

            <div className="display_user">
                <img src={user_img} alt="" />
            </div>

            <div className="post_col">
                <p>{user?.displayName || "User"}</p>
                <input type="text" readOnly placeholder="write your review here" onClick={() => setShow(true)} />
            </div>



            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Upload Your Comment
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <form className="comment_form" onSubmit={handleSubmit}>
                                            <textarea name="comment" className="w-full min-h-40 border-red-50" required />
                                            <ReactStars
                                                count={5}
                                                onChange={ratingChanged}
                                                size={50}
                                                isHalf={true}
                                                emptyIcon={<i className="far fa-star"></i>}
                                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                fullIcon={<i className="fa fa-star"></i>}
                                                activeColor="#ffd700"
                                                value={ratingValue}
                                            />

                                            <button
                                                type="submit"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"

                                            >
                                                Post Comment
                                            </button>

                                        </form>
                                    </div>




                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>




        </div >
    );
};

export default PostComment;