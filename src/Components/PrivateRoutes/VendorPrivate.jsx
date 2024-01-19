import Loader from "../Loader/Loader";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Mycontext } from "../../Authcontext/Authcontext";

const VendorPrivate = ({ children }) => {
    const { user, loading, role } = useContext(Mycontext)
    if (loading) {
        return <Loader/>
    }

    if (!user) {
        return <Navigate to={"/login"} state={location.pathname}></Navigate>
    }

    if (role !== "vendor") {
        return <Navigate to={"/"}></Navigate>
    }
    return children
};

export default VendorPrivate;