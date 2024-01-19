import "./OrderHistorySkeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const OrderHistorySkeleton = () => {
    return (

        <SkeletonTheme baseColor="#dcdcdc" highlightColor="#c1c1c1">
            <div className="history_skeleton">
                <div>
                    <h2><Skeleton count={1} height={"20px"} width={"200px"} /></h2>
                    <h2><Skeleton count={1} height={"20px"} width={"100px"} /></h2>
                    <h2><Skeleton count={1} height={"20px"} width={"70px"} /></h2>
                </div>

                <div className="toggleSkeleton">
                    <Skeleton count={1} height={"100%"} width={"100%"} />
                </div>
            </div >

        </SkeletonTheme>

    );
};

export default OrderHistorySkeleton;