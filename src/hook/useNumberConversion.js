const toStringWithCommas = (number) => {
    const numberToStr = number.toString();
    const result = numberToStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return result;
};
const numberCompression = (number) => {
    if (number >= 1000000000) {
        // Nếu số lớn hơn hoặc bằng 1 tỷ, chuyển thành tỷ (T)
        const num = number / 1000000000;
        const roundedNumber = Math.floor(num * 10) / 10;
        const result = roundedNumber + ' T';
        return result;
    } else if (number >= 1000000) {
        // Nếu số lớn hơn hoặc bằng 1 triệu, chuyển thành triệu (Tr)
        const num = number / 1000000;
        const roundedNumber = Math.floor(num * 10) / 10;
        const result = roundedNumber + ' Tr';
        return result;
    } else if (number >= 1000) {
        // Nếu số lớn hơn hoặc bằng 1 nghìn, chuyển thành nghìn (N)
        let result = Math.floor(number / 1000) + ' N';
        return result;
    } else {
        // Nếu số nhỏ hơn 1 nghìn, giữ nguyên số
        return number.toString();
    }
};
const useNumberConversion = (number, type) => {
    switch (type) {
        case 'commas':
            return toStringWithCommas(number);

        case 'compression':
            return numberCompression(number);

        default:
            return;
    }
};
export default useNumberConversion;
