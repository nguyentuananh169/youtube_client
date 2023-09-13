import axiosClient from './axiosClient';

const subscriptionApi = {
    subscribe: (params) => {
        const url = '/subscription/subscribe.php';
        return axiosClient.post(url, params);
    },
    unsubscribe: (params) => {
        const url = '/subscription/unsubscribe.php';
        return axiosClient.post(url, params);
    },
    checkSubscribe: (params) => {
        const url = '/subscription/check_subscribe.php';
        return axiosClient.get(url, { params });
    },
    showSubscribed: (params) => {
        const url = '/subscription/show_subscribed.php';
        return axiosClient.get(url, { params });
    },
};
export default subscriptionApi;
