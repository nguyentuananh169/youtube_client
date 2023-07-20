import axiosClient from './axiosClient';

const categoryApi = {
    getAll: (params) => {
        const url = '/category/show.php';
        return axiosClient.get(url, { params });
    },
};
export default categoryApi;
