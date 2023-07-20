import axios from 'axios';
import queryString from 'query-string';
import authApi from './authApi';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('access_token');
    if (token && config.url !== '/refresh_token.php') {
        config.headers['access_token'] =
            'Bearer ' + JSON.parse(localStorage.getItem('access_token'));
    }
    if (config.url === '/refresh_token.php') {
        config.headers['refresh_token'] = JSON.parse(localStorage.getItem('refresh_token'));
    }
    return config;
});

let refreshTokenRequest = null;

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    async (error) => {
        if (error.response.status === 401 && error.config.url !== '/refresh_token.php') {
            refreshTokenRequest = refreshTokenRequest
                ? refreshTokenRequest
                : authApi.refreshToken();
            const res = await refreshTokenRequest;
            if (!res.error) {
                localStorage.setItem('access_token', JSON.stringify(res.access_token));
            }
            refreshTokenRequest = null;
            return axiosClient(error.config);
        }
        if (
            error.response.status === 403 ||
            (error.response.status === 401 && error.config.url === '/refresh_token.php')
        ) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/error/403';
        }
        throw error;
    },
);
export default axiosClient;
