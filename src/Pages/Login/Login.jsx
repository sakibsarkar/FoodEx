import "./Login.css";
import SocialAuth from "../../Components/SocialAuth/SocialAuth";
import UseAxios from "../../Hooks & Functions/useAxios";
import { useContext, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Mycontext } from "../../Authcontext/Authcontext";

const Login = () => {
    window.scroll(0, 0)

    const [showPass, setShowPass] = useState(false)

    const { loginWithEmail, logOut } = useContext(Mycontext)
    const axios = UseAxios()

    const handleLogin = async (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        const { user } = await loginWithEmail(email, password)
        await axios.post("/token", { email: user?.email })


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