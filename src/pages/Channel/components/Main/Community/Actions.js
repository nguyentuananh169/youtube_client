import { SlBubbles } from 'react-icons/sl';
import { ThumbsDown, ThumbsUp } from 'react-feather';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import Tooltip from '../../../../../components/Tooltip';
import postVotesApi from '../../../../../api/postVotesApi';
import { addToastMessage } from '../../../../../store/actions/toastMessage';
import useNumberConversion from '../../../../../hook/useNumberConversion';
import styles from './Community.module.css';
function Actions({ item, pathname }) {
    const [isLoading, setIsLoading] = useState(false);
    const [voteType, setVoteType] = useState(item.vote_type);
    const [number, setNumber] = useState({
        like: 0,
        dislike: 0,
    });
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    useEffect(() => {
        setNumber({
            like: 0,
            dislike: 0,
        });
    }, [item.post_id]);
    const numberConversion = useNumberConversion;
    const handleVote = async (valueType) => {
        setIsLoading(true);
        const params = new FormData();
        params.append('_post_id', item.post_id);
        params.append('_vote_type', valueType);
        const response = await postVotesApi.vote(params);
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
        params.append('_post_id', item.post_id);
        params.append('_vote_type', valueType);
        const response = await postVotesApi.changeVote(params);
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
            _post_id: item.post_id,
        };
        const response = await postVotesApi.removeVote(params);
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
        if (isLoading || !item.post_id || !auth.isLogin || !auth.user?.user_id) {
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
        <div className={clsx(styles.actions, { [styles.loading]: isLoading })}>
            <button className={clsx(styles.btn)} onClick={() => handleClickVoteBtn('like', 0)}>
                <Tooltip
                    content={'Thích'}
                    customStyle={{
                        whiteSpace: 'nowrap',
                        top: 'calc(100% + 20px)',
                        lef: '0',
                    }}
                />
                {voteType === 'like' ? (
                    <ThumbsUp strokeWidth={0.7} color="#fff" fill="#000" size={20} />
                ) : (
                    <ThumbsUp strokeWidth={1} size={20} />
                )}
            </button>

            <span className={clsx(styles.count)}>
                {+item.count_like + number.like > 0 && (
                    <span>{numberConversion(+item.count_like + number.like, 'compression')}</span>
                )}
            </span>
            <button className={clsx(styles.btn)} onClick={() => handleClickVoteBtn('dislike', 1)}>
                <Tooltip
                    content={'Không thích'}
                    customStyle={{
                        whiteSpace: 'nowrap',
                        top: 'calc(100% + 20px)',
                        lef: '0',
                    }}
                />
                {voteType === 'dislike' ? (
                    <ThumbsDown strokeWidth={0.7} color="#fff" fill="#000" size={19} />
                ) : (
                    <ThumbsDown strokeWidth={1} size={20} />
                )}
            </button>

            <span className={clsx(styles.count)}>
                {+item.count_dislike + number.dislike > 0 && (
                    <span>
                        {numberConversion(+item.count_dislike + number.dislike, 'compression')}
                    </span>
                )}
            </span>
            {!pathname.startsWith('/post') && (
                <>
                    <Link to={`/posts?id=${item.post_id}`} className={clsx(styles.btn, styles.cmt)}>
                        <Tooltip
                            content={'Bình luận'}
                            customStyle={{
                                whiteSpace: 'nowrap',
                                top: 'calc(100% + 20px)',
                                lef: '0',
                            }}
                        />
                        <SlBubbles size={21} color="#333" strokeWidth={1} />
                    </Link>
                    <span className={clsx(styles.count)}>
                        {item.count_cmt > 0 && numberConversion(item.count_cmt, 'compression')}
                    </span>
                </>
            )}
        </div>
    );
}

export default Actions;
