import axiosClient from './axiosClient';

const playlistApi = {
    getAll: (params) => {
        const url = '/playlist/show.php';
        return axiosClient.get(url, { params });
    },
};
export default playlistApi;
