import "./SocialAuth.css";
import UseAxios from "../../Hooks & Functions/useAxios";
import sound from "../../assets/success.mp3";
import { useContext } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Mycontext } from "../../Authcontext/Authcontext";
import { addUser } from "../../Hooks & Functions/addUser";
import { errorSound } from "../../Hooks & Functions/errorAudio";

const SocialAuth = () => {

    const { googleAuthentication, gitHubAuthentication, logOut, setRole } = useContext(Mycontext)

    const navigate = useNavigate()
    const address = "/"


    const axios = UseAxios()

    const handleMediaLogin = async (media) => {
        let audio = new Audio()
        audio.src = sound
        const toastId = toast.loading("Please wait a momment")
        try {
            const { user } = await media()
            if (!user?.email) {
                toast.error("Error", {
                    description: "Your authprovider doesn't have any email"
                })
                return logOut()
            }

            await axios.post("/token", { email: user?.email })
            const { data: response } = await axios.post("/add/user")
            await addUser(user)
            if (response[1]?.isExist === false) {
                setRole(user)
            }
            toast.dismiss(toastId)
            toast.success("Success", {
                description: `Welcome ${user?.displayName}`
            })
            audio.play()
            navigate(address)
        }

        catch (err) {
            errorSound()
            toast.dismiss(toastId)
            toast.error("Something went Wrong")
            console.log(err);
        }


    }

    return (
        <div className="socialAuthContainer">

            <p>Or</p>
            <div className="authProvider" onClick={() => handleMediaLogin(googleAuthentication)}>
                <FaGoogle />
                <p>Google</p>
            </div>
            <div className="authProvider" onClick={() => handleMediaLogin(gitHubAuthentication)}>
                <FaGithub />
                <p>Github</p>
            </div>

        </div >
    );
};

export default SocialAuth;