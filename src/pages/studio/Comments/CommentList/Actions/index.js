import {
    Check,
    ChevronDown,
    Edit3,
    Flag,
    Heart,
    MoreVertical,
    Shield,
    Slash,
    ThumbsDown,
    ThumbsUp,
    Trash2,
} from 'react-feather';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import useClickOutSide from '../../../../../hook/useClickOutSide';
import DotMenu from '../../../../../components/DotMenu';
import MenuFixed from '../../../../../components/MenuFixed';
import commentVotesApi from '../../../../../api/commentVotesApi';
import commentApi from '../../../../../api/commentApi';
import { addToastMessage } from '../../../../../store/actions/toastMessage';
import Tooltip from '../../../../../components/Tooltip';
import NoAvatar from '../../../../../components/NoAvatar';
import styles from './Actions.module.css';

function Actions({
    count,
    lv2,
    item,
    index,
    isShowForm,
    handleSetShowForm,
    handleSetShowReply,
    handleSetShowFormUpdate,
    hanldeDeleteComment,
}) {
    const [elementRef, isShow, setShow] = useClickOutSide();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const userAvatar = user.user_avatar;
    const userName = user.user_name;
    const userId = user.user_id;
    const [isHeart, setIsHeart] = useState(item.cmt_heart);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingHeart, setIsLoadingHeart] = useState(false);
    const [voteType, setVoteType] = useState(item.vote_type);
    const [number, setNumber] = useState({
        like: 0,
        dislike: 0,
    });

    const menu = [
        {
            icon: <Edit3 size={20} strokeWidth={1} color="#909090" />,
            text: 'Chỉnh sửa',
            isHidden: userId !== item.user_id,
            onClick: handleSetShowFormUpdate,
        },
        {
            icon: <Trash2 size={20} strokeWidth={1} color="#909090" />,
            text: 'Loại bỏ',
            onClick: () => hanldeDeleteComment(index, item.cmt_id, item.cmt_parent_id),
        },
        {
            icon: <Flag size={20} strokeWidth={1} color="#909090" />,
            text: 'Báo vi phạm',
            isHidden: userId === item.user_id,
        },
        {
            icon: <Slash size={20} strokeWidth={1} color="#909090" />,
            text: 'Ẩn người dùng khỏi kênh',
            isHidden: userId === item.user_id,
        },
        {
            icon: <Check size={20} strokeWidth={1} color="#909090" />,
            text: 'Luôn phê duyệt bình luận của người dùng này',
            isHidden: userId === item.user_id,
        },
        {
            icon: <Shield size={20} strokeWidth={1} color="#909090" />,
            text: 'Thêm người dùng làm người kiểm duyệt cấp quản lý',
            isHidden: userId === item.user_id,
        },
        {
            icon: <Shield size={20} strokeWidth={1} color="#909090" />,
            text: 'Thêm người dùng làm người kiểm duyệt cấp tiêu chuẩn',
            isHidden: userId === item.user_id,
        },
    ];

    const handleClickHeart = async () => {
        if (isLoadingHeart) {
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
            _cmt_id: item.cmt_id,
        };
        params._video_id = item.video_id;
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
        if (isLoading) {
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
            <div className={clsx(styles.btns)}>
                <div
                    className={clsx(styles.btn, styles.reply, { [styles.active]: isShowForm })}
                    onClick={handleSetShowForm}
                >
                    Phản hồi
                </div>
                {!lv2 && (
                    <div
                        className={clsx(styles.btn, styles.replyCount)}
                        onClick={handleSetShowReply}
                    >
                        <span>{+item.count_reply + count} phản hồi</span>
                        <ChevronDown size={16} />
                    </div>
                )}
            </div>
            <div className={clsx(styles.btns)}>
                <div
                    className={clsx(styles.btn, styles.like, { [styles.loading]: isLoading })}
                    onClick={() => handleClickVoteBtn('like', 0)}
                >
                    {voteType === 'like' ? (
                        <ThumbsUp size={16} strokeWidth={1} fill="#000" color="#fff" />
                    ) : (
                        <ThumbsUp size={16} strokeWidth={1} />
                    )}
                    {(item.count_like > 0 || number.like > 0) && (
                        <span>{+item.count_like + number.like}</span>
                    )}
                    <Tooltip
                        data-class="tooltip"
                        content={voteType === 'like' ? 'Bỏ thích' : 'Thích'}
                        customStyle={{
                            top: 'calc(100% + 24px)',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            whiteSpace: 'nowrap',
                            fontSize: '1rem',
                            padding: '5px 7px',
                            fontWeight: '500',
                        }}
                    />
                </div>
                <div
                    className={clsx(styles.btn, styles.dislike, { [styles.loading]: isLoading })}
                    onClick={() => handleClickVoteBtn('dislike', 1)}
                >
                    {voteType === 'dislike' ? (
                        <ThumbsDown size={16} strokeWidth={1} fill="#000" color="#fff" />
                    ) : (
                        <ThumbsDown size={16} strokeWidth={1} />
                    )}
                    {(item.count_dislike > 0 || number.dislike > 0) && (
                        <span>{+item.count_dislike + number.dislike}</span>
                    )}
                    <Tooltip
                        data-class="tooltip"
                        content={voteType === 'dislike' ? 'Bỏ không thích' : 'Không thích'}
                        customStyle={{
                            top: 'calc(100% + 24px)',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            whiteSpace: 'nowrap',
                            fontSize: '1rem',
                            padding: '5px 7px',
                            fontWeight: '500',
                        }}
                    />
                </div>
                <div
                    className={clsx(styles.btn, styles.heart, { [styles.loading]: isLoadingHeart })}
                    onClick={handleClickHeart}
                >
                    {isHeart ? (
                        <div className={clsx(styles.img)}>
                            {userAvatar ? (
                                <img src={userAvatar} />
                            ) : (
                                <NoAvatar
                                    userName={userName}
                                    customStyles={{ fontSize: '1.6rem' }}
                                />
                            )}
                            <Heart size={10} strokeWidth={1} fill="red" color="red" />
                        </div>
                    ) : (
                        <Heart size={16} strokeWidth={1} />
                    )}

                    <Tooltip
                        data-class="tooltip"
                        content={isHeart ? 'Bỏ trái tim' : 'Trái tim'}
                        customStyle={{
                            top: 'calc(100% + 24px)',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            whiteSpace: 'nowrap',
                            fontSize: '1rem',
                            padding: '5px 7px',
                            fontWeight: '500',
                        }}
                    />
                </div>
                <div
                    className={clsx(styles.btn, styles.dots)}
                    ref={elementRef}
                    onClick={() => setShow(!isShow)}
                >
                    <DotMenu icon={<MoreVertical color="#909090" size={16} />} />
                    {isShow && <MenuFixed isDisableScroll menulist={menu} />}
                    <Tooltip
                        data-class="tooltip"
                        content={'Menu tác vụ'}
                        customStyle={{
                            top: 'calc(100% + 24px)',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            whiteSpace: 'nowrap',
                            fontSize: '1rem',
                            padding: '5px 7px',
                            fontWeight: '500',
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Actions;
