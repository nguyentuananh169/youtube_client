import axiosClient from './axiosClient';

const authApi = {
    login: (params) => {
        const url = '/auth/login.php';
        return axiosClient.post(url, params);
    },
    register: (params) => {
        const url = '/auth/register.php';
        return axiosClient.post(url, params);
    },
    checkLogin: () => {
        const url = '/auth/check_login.php';
        return axiosClient.post(url);
    },
    refreshToken: () => {
        const url = '/refresh_token.php';
        return axiosClient.post(url);
    },
};
export default authApi;
