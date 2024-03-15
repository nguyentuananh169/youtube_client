import axiosClient from './axiosClient';

const videoApi = {
    add: (params) => {
        const url = '/video/add.php';
        return axiosClient.post(url, params);
    },
    update: (params) => {
        const url = '/video/update.php';
        return axiosClient.post(url, params);
    },
    updateView: (params) => {
        const url = '/video/update_views.php';
        return axiosClient.post(url, params);
    },
    get: (params) => {
        const url = '/video/show.php';
        return axiosClient.get(url, { params });
    },
    delete: (params) => {
        const url = '/video/delete.php';
        return axiosClient.get(url, { params });
    },
};
export default videoApi;
