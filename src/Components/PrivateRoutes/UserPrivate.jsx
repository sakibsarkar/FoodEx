import Loader from "../Loader/Loader";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Mycontext } from "../../Authcontext/Authcontext";

const UserPrivate = ({ children }) => {

    const { loading, user } = useContext(Mycontext)
    if (loading) {
        return <Loader />
    }

    if (user) {
        return children
    }

    return <Navigate state={location.pathname} to={"/login"}></Navigate>
};

export default UserPrivate;