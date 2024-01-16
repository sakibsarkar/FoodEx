import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Mycontext } from "../../Authcontext/Authcontext";

const AdminPrivate = ({ children }) => {
    const { user, loading, role } = useContext(Mycontext)

    if (loading) {
        return <div>loading</div>
    }
    if (!user) {
        return <Navigate state={location.pathname} to={"/login"}></Navigate>
    }

    if (role !== "admin") {
        return <Navigate to={"/"}></Navigate>
    }


    return children
};

export default AdminPrivate;