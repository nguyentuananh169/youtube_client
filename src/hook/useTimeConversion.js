const convertToRelativeTime = (time) => {
    let ms1 = new Date(time).getTime();
    let ms2 = new Date().getTime();
    let ms = ms2 - ms1;

    let seconds = Math.floor(ms / 1000);
    let mins = Math.floor(seconds / 60);
    let hours = Math.floor(mins / 60);
    let day = Math.floor(hours / 24);
    let month = Math.floor(day / 30);
    let year = Math.floor(month / 12);

    if (seconds <= 0) {
        return 'vừa xong';
    } else if (seconds > 0 && seconds < 60) {
        return `${seconds} giây trước`;
    } else if (mins > 0 && mins < 60) {
        return `${mins} phút trước`;
    } else if (hours > 0 && hours < 24) {
        return `${hours} giờ trước`;
    } else if (day > 0 && day < 30) {
        return `${day} ngày trước`;
    } else if (month > 0 && month < 12) {
        return `${month} tháng trước`;
    } else if (year > 0) {
        return `${year} năm trước`;
    }
};
const parseTimeObject = (time) => {
    const date = new Date(time);
    const object = {
        date: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        hours: date.getHours,
        minutes: date.getMinutes,
        seconds: date.getSeconds,
    };
    return object;
};
const useTimeConversion = (time, type) => {
    switch (type) {
        case 'ago':
            return convertToRelativeTime(time);
        case 'object':
            return parseTimeObject(time);
        default:
            return '';
    }
};

export default useTimeConversion;
