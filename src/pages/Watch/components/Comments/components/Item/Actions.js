import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from 'react-icons/ai';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useState } from 'react';
import clsx from 'clsx';
import useStore from '../../../../../../hook/useStore';
import NoAvatar from '../../../../../../components/NoAvatar';
import commentApi from '../../../../../../api/commentApi';
import commentVotesApi from '../../../../../../api/commentVotesApi';
import { addToastMessage } from '../../../../../../store/actions';
import styles from './Item.module.css';
function Actions({ item, ownerId, ownerAvatar, ownerName, isShowForm, setIsShowForm }) {
    const [state, dispatch] = useStore();
    const [isHeart, setIsHeart] = useState(item.cmt_heart);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingHeart, setIsLoadingHeart] = useState(false);
    const [voteType, setVoteType] = useState(item.vote_type);
    const [number, setNumber] = useState({
        like: 0,
        dislike: 0,
    });

    const handleClickHeart = async () => {
        if (isLoadingHeart || state.user?.user_id !== ownerId) {
            return;
        }
        setIsLoadingHeart(true);
        const params = new FormData();
        params.append('_cmt_id', item.cmt_id);
        params.append('_value', isHeart ? 0 : 1);
        const response = await commentApi.heart(params);
        setIsHeart(response[0].is_heart);
        setIsLoadingHeart(false);
    };
    const handleVote = async (valueType) => {
        setIsLoading(true);
        const params = new FormData();
        params.append('_video_id', item.video_id);
        params.append('_cmt_id', item.cmt_id);
        params.append('_cmt_parent_id', item.cmt_parent_id);
        params.append('_vote_type', valueType);
        const response = await commentVotesApi.vote(params);
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
        params.append('_video_id', item.video_id);
        params.append('_cmt_id', item.cmt_id);
        params.append('_vote_type', valueType);
        const response = await commentVotesApi.changeVote(params);
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
            _video_id: item.video_id,
            _cmt_id: item.cmt_id,
        };
        const response = await commentVotesApi.removeVote(params);
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
        if (isLoading || !item.video_id || !state.isLogin || !state.user?.user_id) {
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
                    {voteType === 'like' ? <AiFillLike /> : <AiOutlineLike />}
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
                    {voteType === 'dislike' ? <AiFillDislike /> : <AiOutlineDislike />}
                    {isLoading && <div className={clsx(styles.loading)}></div>}
                </button>
                {(item.count_dislike > 0 || number.dislike > 0) && (
                    <span>{+item.count_dislike + number.dislike}</span>
                )}
            </div>
            {state.user?.user_id === ownerId && !isHeart && (
                <div className={clsx(styles.btn)} onClick={handleClickHeart}>
                    <button>
                        <AiOutlineHeart />
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

                        <AiFillHeart color="red" />
                    </div>
                </div>
            )}
            {state.isLogin && state.user?.user_id && (
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
