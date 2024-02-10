import UseAxios from "./useAxios";
import { useQuery } from "@tanstack/react-query";

const useGetSalesData = () => {

    const axios = UseAxios()
    const { data = [], isLoading } = useQuery({
        queryKey: ["order-stats"],
        queryFn: async () => {
            const { data: res } = await axios.get("/my-states")


            // individual date sales
            const salesData = {}

            for (let sale of res) {
                console.log(Boolean(salesData[sale.date]))
                if (salesData[sale.date]) {
                    salesData[sale.date] += sale.total
                }

                else {
                    salesData[sale.date] = sale.total
                }
            }

            // sales data keys (date of the sale)
            const keys = Object.keys(salesData)

            // graph data
            const graphData = keys.map(key => [key, salesData[key]])



            return graphData
        }

    })

    return { data, isLoading } || {}
}

export default useGetSalesData