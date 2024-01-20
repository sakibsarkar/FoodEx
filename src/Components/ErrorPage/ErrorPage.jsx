import "./ErrorPage.css";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="errorContainer" >
            <img src="https://i.ibb.co/JnGgCDQ/Oops-404-Error-with-a-broken-robot-amico-removebg-preview.png" alt="" draggable={false} />
            <p>Opps! This page is currently not available</p>
            <Link to={"/"}>GO TO HOME</Link>
        </div>
    );
};

export default ErrorPage;