import axiosClient from './axiosClient';

const postCommentApi = {
    add: (params) => {
        const url = '/post_comments/add.php';
        return axiosClient.post(url, params);
    },
    update: (params) => {
        const url = '/post_comments/update.php';
        return axiosClient.post(url, params);
    },
    heart: (params) => {
        const url = '/post_comments/heart.php';
        return axiosClient.post(url, params);
    },
    pin: (params) => {
        const url = '/post_comments/pin.php';
        return axiosClient.post(url, params);
    },
    get: (params) => {
        const url = '/post_comments/show.php';
        return axiosClient.get(url, { params });
    },
    delete: (params) => {
        const url = '/post_comments/delete.php';
        return axiosClient.get(url, { params });
    },
};
export default postCommentApi;
