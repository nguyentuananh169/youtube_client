import axiosClient from './axiosClient';

const videoVotesApi = {
    vote: (params) => {
        const url = '/video_votes/vote.php';
        return axiosClient.post(url, params);
    },
    checkVote: (params) => {
        const url = '/video_votes/check_vote.php';
        return axiosClient.get(url, { params });
    },
    changeVote: (params) => {
        const url = '/video_votes/change_vote.php';
        return axiosClient.post(url, params);
    },
    removeVote: (params) => {
        const url = '/video_votes/remove_vote.php';
        return axiosClient.get(url, { params });
    },
    showVideoByVote: (params) => {
        const url = '/video_votes/show_video_by_vote.php';
        return axiosClient.get(url, { params });
    },
};
export default videoVotesApi;
