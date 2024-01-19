import "./Loader.css";
import { Bars } from "react-loader-spinner";

const Loader = () => {
    return (
        <div className="loader_container">
            <Bars
                height="80"
                width="80"
                color="#da1481"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
            <p>Please wait...</p>
        </div>
    );
};

export default Loader;