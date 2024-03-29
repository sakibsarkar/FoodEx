export const getSalesData = (data = []) => {

    // individual date sales
    const salesData = {}

    for (let sale of data) {
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

