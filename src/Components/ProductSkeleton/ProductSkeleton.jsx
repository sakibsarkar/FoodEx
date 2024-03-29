import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const ProductSkeleton = () => {
    return (
        <SkeletonTheme baseColor="#dcdcdc" highlightColor="#c1c1c1">
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <Skeleton count={1} height={"200px"} width={"307px"} />
                <p> <Skeleton count={1} width={"200px"} /></p>
                <p> <Skeleton count={1} width={"150px"} /></p>
                <div style={{ display: "flex", gap: "5px" }}>
                    <p> <Skeleton count={1} width={"50px"} /></p>
                    <p> <Skeleton count={1} width={"45px"} /></p>
                </div>
            </div>
        </SkeletonTheme>
    );
};

export default ProductSkeleton;