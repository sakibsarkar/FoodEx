export const todayDate = () => {
    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];

    const today = new Date()
    const date = today.getDate()
    const monthIndex = today.getMonth()
    const month = months[monthIndex]
    const year = today.getFullYear()

    return `${date} ${month}, ${year}`
}