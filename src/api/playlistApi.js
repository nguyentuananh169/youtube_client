import axiosClient from './axiosClient';

const playlistApi = {
    get: (params) => {
        const url = '/playlist/show.php';
        return axiosClient.get(url, { params });
    },
    add: (params) => {
        const url = '/playlist/add.php';
        return axiosClient.post(url, params);
    },
    update: (params) => {
        const url = '/playlist/update.php';
        return axiosClient.post(url, params);
    },
    delete: (params) => {
        const url = '/playlist/delete.php';
        return axiosClient.get(url, { params });
    },
    search: (params) => {
        const url = '/playlist/search.php';
        return axiosClient.get(url, { params });
    },
};
export default playlistApi;
