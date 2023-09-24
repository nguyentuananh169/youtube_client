import axiosClient from './axiosClient';

const postCommentVotesApi = {
    vote: (params) => {
        const url = '/post_comment_vote/vote.php';
        return axiosClient.post(url, params);
    },
    changeVote: (params) => {
        const url = '/post_comment_vote/change_vote.php';
        return axiosClient.post(url, params);
    },
    removeVote: (params) => {
        const url = '/post_comment_vote/remove_vote.php';
        return axiosClient.get(url, { params });
    },
};
export default postCommentVotesApi;
