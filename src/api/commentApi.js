import axiosClient from './axiosClient';

const commentApi = {
    add: (params) => {
        const url = '/comments/add.php';
        return axiosClient.post(url, params);
    },
    update: (params) => {
        const url = '/comments/update.php';
        return axiosClient.post(url, params);
    },
    heart: (params) => {
        const url = '/comments/heart.php';
        return axiosClient.post(url, params);
    },
    pin: (params) => {
        const url = '/comments/pin.php';
        return axiosClient.post(url, params);
    },
    get: (params) => {
        const url = '/comments/show.php';
        return axiosClient.get(url, { params });
    },
    delete: (params) => {
        const url = '/comments/delete.php';
        return axiosClient.get(url, { params });
    },
};
export default commentApi;
