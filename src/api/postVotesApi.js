import axiosClient from './axiosClient';

const postVotesApi = {
    vote: (params) => {
        const url = '/post_votes/vote.php';
        return axiosClient.post(url, params);
    },
    checkVote: (params) => {
        const url = '/post_votes/check_vote.php';
        return axiosClient.get(url, { params });
    },
    changeVote: (params) => {
        const url = '/post_votes/change_vote.php';
        return axiosClient.post(url, params);
    },
    removeVote: (params) => {
        const url = '/post_votes/remove_vote.php';
        return axiosClient.get(url, { params });
    },
};
export default postVotesApi;
