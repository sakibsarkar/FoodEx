import "./Login.css";
import SocialAuth from "../../Components/SocialAuth/SocialAuth";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
    window.scroll(0, 0)

    const [showPass, setShowPass] = useState(false)

    return (
        <div className="loginContainer">
            <div className="loginBox">
                <form>
                    <div>
                        <p>Email</p>
                        <input type="email" required />
                    </div>

                    <div>
                        <p>Password</p>
                        <input type={showPass ? "text" : "password"} required />
                        <div className="eye" onClick={() => setShowPass(!showPass)}>
                            {
                                showPass ?
                                    <FiEyeOff /> : <FiEye />
                            }
                        </div>
                    </div>
                    <button>Login</button>
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