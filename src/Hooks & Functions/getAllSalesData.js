export const getAllSalesData = (data = []) => {
    // individual date sales
    // individual date sales
    const salesData = data?.map(sale => [sale.date, sale.total])
    return [...salesData]
}