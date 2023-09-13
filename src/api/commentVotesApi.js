import axiosClient from './axiosClient';

const videoVotesApi = {
    vote: (params) => {
        const url = '/comment_votes/vote.php';
        return axiosClient.post(url, params);
    },
    changeVote: (params) => {
        const url = '/comment_votes/change_vote.php';
        return axiosClient.post(url, params);
    },
    removeVote: (params) => {
        const url = '/comment_votes/remove_vote.php';
        return axiosClient.get(url, { params });
    },
};
export default videoVotesApi;
