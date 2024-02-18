import "./Login.css";
import SocialAuth from "../../Components/SocialAuth/SocialAuth";
import UseAxios from "../../Hooks & Functions/useAxios";
import sound from "../../assets/success.mp3";
import { useContext, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Mycontext } from "../../Authcontext/Authcontext";
import { errorSound } from "../../Hooks & Functions/errorAudio";

const Login = () => {
    window.scroll(0, 0)

    const [showPass, setShowPass] = useState(false)

    const navigate = useNavigate()
    const { loginWithEmail, logOut } = useContext(Mycontext)
    const axios = UseAxios()
    const location = useLocation()
    const adress = location.state || "/"

    const handleLogin = async (e) => {
        e.preventDefault()
        let audio = new Audio()
        audio.src = sound

        const form = e.target
        const email = form.email.value
        const password = form.password.value
        const toastId = toast.loading("Please wait a moment...")
        try {
            const { user } = await loginWithEmail(email, password)
            await axios.post("/token", { email: user?.email })
            toast.dismiss(toastId)
            toast.success("Welcome back")
            audio.play()
            navigate(adress)
        }

        catch (err) {
            errorSound()
            toast.dismiss(toastId)
            toast.error("Something wen wrong", {
                description: "Please check your email and password"
            })
        }


    }
    return (
        <div className="loginContainer">
            <div className="loginBox">
                <form onSubmit={handleLogin}>
                    <div className="inputBox">
                        <p>Email</p>
                        <input name="email" type="email" required />
                    </div>

                    <div className="inputBox">
                        <p>Password</p>
                        <input name="password" type={showPass ? "text" : "password"} required />
                        <div className="eye" onClick={() => setShowPass(!showPass)}>
                            {
                                showPass ?
                                    <FiEyeOff /> : <FiEye />
                            }
                        </div>
                    </div>
                    <button type="submit">Login</button>
                    <p className="goTo">New here? <Link to={"/signup"}>Signup</Link></p>
                    <SocialAuth />
                </form>


                <div className="loginLeft">
                    <h1>Welcome Back</h1>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque ad possimus dolor illo praesentium error alias reiciendis aut</p>
                </div>
            </div>
        </div>
    );
};

export default Login;