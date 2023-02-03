const formatDate = (separator = '') => {
    let date = new Date();
    const formatTime = () => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let day = date.getDate();
        let year = date.getFullYear();
        let month = date.getMonth();
        let amOrPm = hours >= 12 ? `PM` : `AM`;

        hours = hours % 12 || 12;

        month = formatZeroes(month)
        day = formatZeroes(day)
        hours = formatZeroes(hours);
        minutes = formatZeroes(minutes);
        seconds = formatZeroes(seconds);

        return `${month}-${day}-${year} ${hours}:${minutes} ${amOrPm}`;
    }
    const formatZeroes = (time) => {
        time = time.toString();
        return time.length < 2 ? `0` + time : time;
    }
    return (`${formatTime()}`)
}

export default formatDate;
