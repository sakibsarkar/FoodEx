import "./SocialAuth.css";
import { FaGithub, FaGoogle } from "react-icons/fa";

const SocialAuth = () => {
    return (
        <div className="socialAuthContainer">

            <p>Or</p>
            <div className="authProvider">
                <FaGoogle />
                <p>Google</p>
            </div>
            <div className="authProvider">
                <FaGithub />
                <p>Github</p>
            </div>

        </div>
    );
};

export default SocialAuth;