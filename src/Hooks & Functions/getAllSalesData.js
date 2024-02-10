export const getAllSalesData = (data = []) => {
    // individual date sales
    const salesData = []

    for (let sale of data) {

        salesData[sale.date] = sale.total

    }

    // sales data keys (date of the sale)
    const keys = Object.keys(salesData)

    // graph data
    const graphData = keys.map(key => [key, salesData[key]])


    return graphData
}