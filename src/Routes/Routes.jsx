import AdminPrivate from "../Components/PrivateRoutes/AdminPrivate";
import AllCompletedOrders from "../DashboardPages/Vendor/AllCompletedOrders/AllCompletedOrders";
import AllFoods from "../Pages/AllFoods/AllFoods";
import AllUser from "../DashboardPages/Admin/AllUser/AllUser";
import Checkout from "../Pages/Checkout/Checkout";
import DashboardLayout from "../Layout/DashboardLayout/DashboardLayout";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import MainLayout from "../Layout/MainLayout";
import ManageShop from "../DashboardPages/Vendor/ManageShop/ManageShop";
import OrderHistory from "../Pages/OrderHistory/OrderHistory";
import Overview from "../DashboardPages/Vendor/Overview/Overview";
import PendingOrders from "../DashboardPages/Vendor/PendingOrders/PendingOrders";
import Restaurants from "../Pages/Restaurants/Restaurants";
import Shop from "../Pages/Shop/Shop";
import Signup from "../Pages/Signup/Signup";
import UserPrivate from "../Components/PrivateRoutes/UserPrivate";
import VendorPrivate from "../Components/PrivateRoutes/VendorPrivate";
import VendorReq from "../DashboardPages/Admin/VendorReq/VendorReq";
import VendorReqForm from "../Pages/VendorReqForm/VendorReqForm";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
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
                path: "/restaurants",
                element: <Restaurants />
            },
            {
                path: "/becomeVendor",
                element: <UserPrivate><VendorReqForm /></UserPrivate>
            },
            {
                path: "/shop/:vendor_id",
                element: <UserPrivate><Shop /></UserPrivate>
            },
            {
                path: '/payment',
                element: <UserPrivate><Checkout /></UserPrivate>
            },
            {
                path: "/orderHistory",
                element: <UserPrivate><OrderHistory /></UserPrivate>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            // admin Routes
            {
                path: "/dashboard/admin",
                element: <AdminPrivate><VendorReq /></AdminPrivate>
            },
            {
                path: "/dashboard/users",
                element: <AdminPrivate><AllUser /></AdminPrivate>
            },
            // vendor routes
            {
                path: '/dashboard/vendor',
                element: <VendorPrivate><Overview /></VendorPrivate>
            },
            {
                path: "/dashboard/manageShop",
                element: <VendorPrivate><ManageShop /></VendorPrivate>
            },
            {
                path: "/dashboard/pendingOrders",
                element: <VendorPrivate><PendingOrders /></VendorPrivate>
            },
            {
                path: "/dashboard/completedOrder",
                element: <VendorPrivate ><AllCompletedOrders /></VendorPrivate>
            }
        ]
    }
])