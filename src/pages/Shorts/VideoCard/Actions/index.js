import { ThumbsDown, ThumbsUp } from 'react-feather';
import { MdComment } from 'react-icons/md';
import { RiShareForwardFill } from 'react-icons/ri';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { TfiAlignLeft } from 'react-icons/tfi';
import { VscSaveAll } from 'react-icons/vsc';
import { SlFlag, SlBan } from 'react-icons/sl';
import { MdOutlineFeedback } from 'react-icons/md';
import { RiClosedCaptioningLine } from 'react-icons/ri';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import useClickOutSide from '../../../../hook/useClickOutSide';
import videoVotesApi from '../../../../api/videoVotesApi';
import useNumberConversion from '../../../../hook/useNumberConversion';
import MenuFixed from '../../../../components/MenuFixed';
import Tooltip from '../../../../components/Tooltip';
import LoadingHasMore from '../../../../components/LoadingHasMore';
import { addToastMessage } from '../../../../store/actions/toastMessage';
import styles from './Actions.module.css';

function Actions({
    item,
    handleSetShowComment,
    isShowComment,
    handleSetShowDes,
    handleStopPropagation,
    isShowDes,
}) {
    const dataMenuFixed = [
        {
            icon: <TfiAlignLeft />,
            text: 'Thông tin mô tả',
            onClick: () => {
                setShow(false);
                handleSetShowDes();
            },
        },
        {
            icon: <VscSaveAll />,
            text: 'Lưu vào danh sách phát',
        },
        {
            icon: <RiClosedCaptioningLine />,
            text: 'Phụ đề',
        },
        {
            icon: <SlBan />,
            text: 'Không đề xuất kênh này',
        },
        {
            icon: <SlFlag />,
            text: 'Báo cáo vi phạm',
        },
        {
            icon: <MdOutlineFeedback />,
            text: 'Gửi ý kiến phản hồi',
        },
    ];
    const [elementRef, isShow, setShow] = useClickOutSide();
    const [isLoading, setIsLoading] = useState(false);
    const [voteType, setVoteType] = useState(item.vote_type);
    const [number, setNumber] = useState({
        like: 0,
        dislike: 0,
    });
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const numberConversion = useNumberConversion;
    const handleVote = async (valueType) => {
        setIsLoading(true);
        const params = new FormData();
        params.append('_video_id', item.video_id);
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
        params.append('_video_id', item.video_id);
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
            _video_id: item.video_id,
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
        if (isLoading || !item.video_id || !auth.isLogin || !auth.user?.user_id) {
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
        <div
            className={clsx(styles.wrapper, { [styles.mobile]: isShowComment || isShowDes })}
            onTouchStart={handleStopPropagation}
            onTouchMove={handleStopPropagation}
            onTouchEnd={handleStopPropagation}
        >
            <div className={clsx(styles.item, { [styles.active]: voteType === 'like' })}>
                <div
                    className={clsx(styles.btn, { [styles.loading]: isLoading })}
                    onClick={() => handleClickVoteBtn('like', 0)}
                >
                    {isLoading ? <LoadingHasMore spinColor="#606060" /> : <ThumbsUp size={20} />}

                    <Tooltip
                        content={voteType === 'like' ? 'Bỏ thích video này' : 'Tôi thích video này'}
                        customStyle={{
                            whiteSpace: 'nowrap',
                            right: 'calc(100% + 12px)',
                            fontSize: '1.2rem',
                        }}
                    />
                </div>
                <p>
                    {+item.video_like + number.like > 0
                        ? numberConversion(+item.video_like + number.like, 'compression')
                        : 'Không có'}
                </p>
            </div>
            <div className={clsx(styles.item, { [styles.active]: voteType === 'dislike' })}>
                <div
                    className={clsx(styles.btn, { [styles.loading]: isLoading })}
                    onClick={() => handleClickVoteBtn('dislike', 1)}
                >
                    {isLoading ? <LoadingHasMore spinColor="#606060" /> : <ThumbsDown size={20} />}

                    <Tooltip
                        content={'Tôi không thích video này'}
                        customStyle={{
                            whiteSpace: 'nowrap',
                            right: 'calc(100% + 12px)',
                            fontSize: '1.2rem',
                        }}
                    />
                </div>
                <p>
                    {+item.video_dislike + number.dislike > 0
                        ? numberConversion(+item.video_dislike + number.dislike, 'compression')
                        : 'Không có'}
                </p>
            </div>
            <div className={clsx(styles.item)}>
                <div className={clsx(styles.btn)} onClick={handleSetShowComment}>
                    <MdComment size={20} />
                    <Tooltip
                        content={'Bình luận'}
                        customStyle={{
                            whiteSpace: 'nowrap',
                            right: 'calc(100% + 12px)',
                            fontSize: '1.2rem',
                        }}
                    />
                </div>
                <p>{+item.video_cmt > 0 ? item.video_cmt : 'Không có'}</p>
            </div>
            <div className={clsx(styles.item)}>
                <div className={clsx(styles.btn)}>
                    <RiShareForwardFill size={20} />
                    <Tooltip
                        content={'Chia sẻ'}
                        customStyle={{
                            whiteSpace: 'nowrap',
                            right: 'calc(100% + 12px)',
                            fontSize: '1.2rem',
                        }}
                    />
                </div>
                <p>Chia sẻ</p>
            </div>
            <div className={clsx(styles.item)}>
                <div className={clsx(styles.btn)} ref={elementRef} onClick={() => setShow(!isShow)}>
                    <HiOutlineDotsVertical size={20} />
                    {isShow && <MenuFixed isDisableScroll menulist={dataMenuFixed} />}
                </div>
            </div>
        </div>
    );
}

export default Actions;
