import "./Overview.css";
import Chart from "react-google-charts";
import useGetSalesData from "../../../Hooks & Functions/getSalesData";

const Overview = () => {


    const { data = [], isLoading } = useGetSalesData()


    const salesData = [
        ["Date", "Total Sale"],
        ...data

    ];


    return (
        <div>
            <Chart
                chartType="Bar"
                width="100%"
                height="400px"
                data={salesData}
                style={{ background: "red" }}
            // options={options}
            />
        </div>
    );
};

export default Overview;