import AllFoods from "../Pages/AllFoods/AllFoods";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import MainLayout from "../Layout/MainLayout";
import Signup from "../Pages/Signup/Signup";
import UserPrivate from "../Components/PrivateRoutes/UserPrivate";
import VendorReqForm from "../Pages/VendorReqForm/VendorReqForm";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <Signup />
            },
            {
                path: "/delivery",
                element: <AllFoods />
            },
            {
                path: "/becomeVendor",
                element: <UserPrivate><VendorReqForm /></UserPrivate>
            }
        ]
    }
])