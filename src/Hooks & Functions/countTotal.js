export const countTotal = (data = []) => {
    let value = 0
    data?.forEach(e => {
        value += e.price
    })
    return value
}