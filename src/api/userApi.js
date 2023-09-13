import axiosClient from './axiosClient';

const userApi = {
    add: (params) => {
        const url = '/user/add.php';
        return axiosClient.post(url, params);
    },
    update: (params) => {
        const url = '/user/update.php';
        return axiosClient.post(url, params);
    },
    get: (params) => {
        const url = '/user/show.php';
        return axiosClient.get(url, { params });
    },
    statistical: (params) => {
        const url = '/user/statistical.php';
        return axiosClient.get(url, { params });
    },
    delete: (params) => {
        const url = '/user/delete.php';
        return axiosClient.get(url, { params });
    },
};
export default userApi;
