import { Heart, ThumbsDown, ThumbsUp } from 'react-feather';
import { useState } from 'react';
import clsx from 'clsx';
import NoAvatar from '../../../../../../components/NoAvatar';
import commentApi from '../../../../../../api/commentApi';
import commentVotesApi from '../../../../../../api/commentVotesApi';
import postCommentApi from '../../../../../../api/postCommentApi';
import postCommentVotesApi from '../../../../../../api/postCommentVotesApi';
import { addToastMessage } from '../../../../../../store/actions/toastMessage';
import styles from './Item.module.css';
import { useDispatch, useSelector } from 'react-redux';
function Actions({
    isPostsPage,
    item,
    ownerId,
    ownerAvatar,
    ownerName,
    isShowForm,
    setIsShowForm,
}) {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const [isHeart, setIsHeart] = useState(item.cmt_heart);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingHeart, setIsLoadingHeart] = useState(false);
    const [voteType, setVoteType] = useState(item.vote_type);
    const [number, setNumber] = useState({
        like: 0,
        dislike: 0,
    });

    const handleClickHeart = async () => {
        if (isLoadingHeart || auth.user?.user_id !== ownerId) {
            return;
        }
        setIsLoadingHeart(true);
        const params = new FormData();
        params.append('_cmt_id', item.cmt_id);
        params.append('_value', isHeart ? 0 : 1);

        const response = isPostsPage
            ? await postCommentApi.heart(params)
            : await commentApi.heart(params);
        setIsHeart(response[0].is_heart);
        setIsLoadingHeart(false);
    };
    const handleVote = async (valueType) => {
        setIsLoading(true);
        const params = new FormData();
        if (isPostsPage) {
            params.append('_post_id', item.post_id);
        } else {
            params.append('_video_id', item.video_id);
        }
        params.append('_cmt_id', item.cmt_id);
        params.append('_cmt_parent_id', item.cmt_parent_id);
        params.append('_vote_type', valueType);
        const response = isPostsPage
            ? await postCommentVotesApi.vote(params)
            : await commentVotesApi.vote(params);
        if (response[0].error) {
            dispatch(addToastMessage('error', 'Thất bại', response[0].message));
        } else {
            const type = response[0].vote_type;
            setVoteType(type);
            setNumber({ ...number, [type]: number[type] + 1 });
        }
        setIsLoading(false);
    };
    const handleChangeVote = async (valueType) => {
        setIsLoading(true);
        const params = new FormData();
        if (isPostsPage) {
            params.append('_post_id', item.post_id);
        } else {
            params.append('_video_id', item.video_id);
        }
        params.append('_cmt_id', item.cmt_id);
        params.append('_vote_type', valueType);
        const response = isPostsPage
            ? await postCommentVotesApi.changeVote(params)
            : await commentVotesApi.changeVote(params);
        setIsLoading(false);
        if (response[0].error) {
            return dispatch(addToastMessage('error', 'Thất bại', response[0].message));
        }
        const type = response[0].vote_type;
        if (type === 'like') {
            setNumber({ like: number.like + 1, dislike: number.dislike - 1 });
        } else {
            setNumber({ like: number.like - 1, dislike: number.dislike + 1 });
        }
        setVoteType(type);
    };
    const handleRemoveVote = async (actionTpye) => {
        setIsLoading(true);
        const params = {
            _cmt_id: item.cmt_id,
        };
        if (isPostsPage) {
            params._post_id = item.post_id;
        } else {
            params._video_id = item.video_id;
        }
        const response = isPostsPage
            ? await postCommentVotesApi.removeVote(params)
            : await commentVotesApi.removeVote(params);
        setIsLoading(false);
        if (response[0].error) {
            return dispatch(addToastMessage('error', 'Thất bại', response[0].message));
        }
        if (actionTpye === 'like') {
            setNumber({ ...number, like: number.like - 1 });
        } else {
            setNumber({ ...number, dislike: number.dislike - 1 });
        }
        setVoteType('');
    };
    const handleClickVoteBtn = (actionTpye, valueType) => {
        if (isLoading || !auth.isLogin || !auth.user?.user_id) {
            return;
        }
        switch (actionTpye) {
            case 'like':
                if (voteType === 'like') {
                    handleRemoveVote('like');
                } else if (voteType === 'dislike') {
                    handleChangeVote(valueType);
                } else {
                    handleVote(valueType);
                }
                break;
            case 'dislike':
                if (voteType === 'dislike') {
                    handleRemoveVote('dislike');
                } else if (voteType === 'like') {
                    handleChangeVote(valueType);
                } else {
                    handleVote(valueType);
                }
                break;
            default:
                break;
        }
    };
    return (
        <div className={clsx(styles.actions)}>
            <div
                className={clsx(styles.btn, { [styles.loading]: isLoading })}
                onClick={() => handleClickVoteBtn('like', 0)}
            >
                <button>
                    {voteType === 'like' ? (
                        <ThumbsUp strokeWidth={0.7} color="#fff" fill="#000" size={19} />
                    ) : (
                        <ThumbsUp strokeWidth={1} size={19} />
                    )}
                    {isLoading && <div className={clsx(styles.loading)}></div>}
                </button>
                {(item.count_like > 0 || number.like > 0) && (
                    <span>{+item.count_like + number.like}</span>
                )}
            </div>
            <div
                className={clsx(styles.btn, { [styles.loading]: isLoading })}
                onClick={() => handleClickVoteBtn('dislike', 1)}
            >
                <button>
                    {voteType === 'dislike' ? (
                        <ThumbsDown strokeWidth={0.7} color="#fff" fill="#000" size={19} />
                    ) : (
                        <ThumbsDown strokeWidth={1} size={19} />
                    )}
                    {isLoading && <div className={clsx(styles.loading)}></div>}
                </button>
                {(item.count_dislike > 0 || number.dislike > 0) && (
                    <span>{+item.count_dislike + number.dislike}</span>
                )}
            </div>
            {auth.user?.user_id === ownerId && !isHeart && (
                <div className={clsx(styles.btn)} onClick={handleClickHeart}>
                    <button>
                        <Heart size={19} strokeWidth={1} />
                    </button>
                </div>
            )}
            {isHeart && (
                <div className={clsx(styles.ownerHeart)}>
                    <div className={clsx(styles.avt)} onClick={handleClickHeart}>
                        {ownerAvatar ? (
                            <img src={ownerAvatar} alt="" />
                        ) : (
                            <NoAvatar userName={ownerName} />
                        )}

                        <Heart color="red" fill="red" size={12} />
                    </div>
                </div>
            )}
            {auth.isLogin && auth.user?.user_id && (
                <div
                    className={clsx(styles.btn, styles.reply, { [styles.active]: isShowForm })}
                    onClick={() => setIsShowForm(!isShowForm)}
                >
                    Phản hồi
                </div>
            )}
        </div>
    );
}

export default Actions;
