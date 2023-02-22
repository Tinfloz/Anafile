export const getDate = (dateString) => {
    let dt = new Date(dateString).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    return dt
}