import { ThumbsUp, ThumbsDown, Download, Share2 } from 'react-feather';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import Tooltip from '../../../../../../components/Tooltip';
import videoVotesApi from '../../../../../../api/videoVotesApi';
import { addToastMessage } from '../../../../../../store/actions/toastMessage';
import useNumberConversion from '../../../../../../hook/useNumberConversion';
import styles from './Actions.module.css';
function Actions({ videoId, like, dislike }) {
    const [isLoading, setIsLoading] = useState(false);
    const [voteType, setVoteType] = useState('');
    const [number, setNumber] = useState({
        like: 0,
        dislike: 0,
    });
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const numberConversion = useNumberConversion;
    useEffect(() => {
        setNumber({
            like: 0,
            dislike: 0,
        });
    }, [videoId]);
    useEffect(() => {
        if (videoId && auth.isLogin && auth.user?.user_id) {
            const checkVote = async () => {
                setIsLoading(true);
                const params = {
                    _video_id: videoId,
                };
                const response = await videoVotesApi.checkVote(params);

                if (response[0]?.error) {
                    dispatch(addToastMessage('error', 'Có lỗi', response[0].message));
                } else {
                    setVoteType(response[0].vote_type);
                }
                setIsLoading(false);
            };
            checkVote();
        }
    }, [videoId]);
    const handleVote = async (valueType) => {
        setIsLoading(true);
        const params = new FormData();
        params.append('_video_id', videoId);
        params.append('_vote_type', valueType);
        const response = await videoVotesApi.vote(params);

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
        params.append('_video_id', videoId);
        params.append('_vote_type', valueType);
        const response = await videoVotesApi.changeVote(params);

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
            _video_id: videoId,
        };
        const response = await videoVotesApi.removeVote(params);

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
        if (isLoading || !videoId || !auth.isLogin || !auth.user?.user_id) {
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
            <div className={clsx(styles.btn, styles.likeDislike, { [styles.loading]: isLoading })}>
                <button onClick={() => handleClickVoteBtn('like', 0)}>
                    <Tooltip
                        content={'Tôi thích video này'}
                        customStyle={{
                            top: 'calc(100% + 20px)',
                            whiteSpace: 'nowrap',
                            left: '-10px',
                            display: isLoading && 'none',
                        }}
                    />
                    {voteType === 'like' ? (
                        <ThumbsUp color="#fff" fill="#333" size={20} strokeWidth={0.7} />
                    ) : (
                        <ThumbsUp size={20} strokeWidth={1} />
                    )}

                    {+like + number.like > 0 && (
                        <span>{numberConversion(+like + number.like, 'compression')}</span>
                    )}
                </button>
                <button onClick={() => handleClickVoteBtn('dislike', 1)}>
                    <Tooltip
                        content={'Tôi không thích video này'}
                        customStyle={{
                            top: 'calc(100% + 20px)',
                            whiteSpace: 'nowrap',
                            left: '-50px',
                            display: isLoading && 'none',
                        }}
                    />

                    {voteType === 'dislike' ? (
                        <ThumbsDown color="#fff" fill="#333" size={20} strokeWidth={0.7} />
                    ) : (
                        <ThumbsDown size={20} strokeWidth={1} />
                    )}
                    {+dislike + number.dislike > 0 && (
                        <span>{numberConversion(+dislike + number.dislike, 'compression')}</span>
                    )}
                </button>
            </div>
            <div className={clsx(styles.btn, styles.share)}>
                <button>
                    <Tooltip
                        content={'Chia sẻ'}
                        customStyle={{
                            top: 'calc(100% + 20px)',
                            whiteSpace: 'nowrap',
                        }}
                    />
                    <Share2 strokeWidth={1} size={20} />
                    <span>Chia sẻ</span>
                </button>
            </div>
            <div className={clsx(styles.btn, styles.share)}>
                <button>
                    <Tooltip
                        content={'Chia sẻ'}
                        customStyle={{
                            top: 'calc(100% + 20px)',
                            whiteSpace: 'nowrap',
                        }}
                    />
                    <Download strokeWidth={1} size={20} />
                    <span>Tải xuống</span>
                </button>
            </div>
        </div>
    );
}

export default Actions;
