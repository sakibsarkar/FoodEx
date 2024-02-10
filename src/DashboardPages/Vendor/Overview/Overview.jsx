import "./Overview.css";
import Chart from "react-google-charts";
import UseAxios from "../../../Hooks & Functions/useAxios";
import { useQuery } from "@tanstack/react-query";
import { getAllSalesData } from "../../../Hooks & Functions/getAllSalesData";
import { getSalesData } from "../../../Hooks & Functions/getSalesData";

const Overview = () => {

    const axios = UseAxios()
    const { data: sales } = useQuery({
        queryKey: ["salesData"],
        queryFn: async () => {
            const { data: res } = await axios.get("/my-states")
            return res
        }
    })

    // get total sale data for chart 
    const sales_data = getSalesData(sales)

    // all sale chart data
    const all_sales_data = getAllSalesData(sales) || []

    // total sale amount
    const saleArr = sales?.map(sale => sale.total)
    const totalSale = saleArr?.reduce((acc, cur) => acc + cur, 0)



    const salesData = [
        ["Date", "Total Sale"],
        ...sales_data

    ];


    const all_sale_chart_data = [
        ["Date", "Total Ammount"],
        ...all_sales_data
    ]

    const option = {
        backgroundColor: "white",
    }


    return (
        <div className="overview_container">

            <div className="topBox">
                <div className="box">
                    <p>Total Sale: </p>
                    <h2>${totalSale}</h2>
                </div>
                <div>
                    <Chart
                        chartType="PieChart"
                        width="100%"
                        height="250px"
                        data={all_sale_chart_data}
                    />
                </div>

                <div>
                    <Chart
                        chartType="Line"
                        width="100%"
                        height="250px"
                        data={all_sale_chart_data}
                    />
                </div>

            </div>

            <Chart
                chartType="Bar"
                width="100%"
                height={"500px"}
                data={salesData}
                options={option}

            />
        </div>
    );
};

export default Overview;