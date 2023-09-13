const formatNumber = (number) => {
    if (number >= 0 && number < 10) {
        return `0${number}`;
    } else {
        return number;
    }
};
const formatDuration = (duration) => {
    let seconds = Math.floor(duration % 60);
    let minutes = Math.floor(duration / 60) % 60;
    let hours = Math.floor(duration / 3600);
    if (hours > 0) {
        return `${hours}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
    } else {
        return `${minutes}:${formatNumber(seconds)}`;
    }
};
export default formatDuration;
