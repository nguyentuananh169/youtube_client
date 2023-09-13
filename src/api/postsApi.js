import axiosClient from './axiosClient';

const videoApi = {
    add: (params) => {
        const url = '/posts/add.php';
        return axiosClient.post(url, params);
    },
    update: (params) => {
        const url = '/posts/update.php';
        return axiosClient.post(url, params);
    },
    get: (params) => {
        const url = '/posts/show.php';
        return axiosClient.get(url, { params });
    },
    delete: (params) => {
        const url = '/posts/delete.php';
        return axiosClient.get(url, { params });
    },
};
export default videoApi;
