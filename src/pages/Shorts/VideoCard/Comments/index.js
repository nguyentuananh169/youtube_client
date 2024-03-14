import { AlignLeft, X } from 'react-feather';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import CommentGroup from '../../../Watch/components/Comments/components/CommentGroup';
import Form from '../../../Watch/components/Comments/components/Form';
import commentApi from '../../../../api/commentApi';
import LoadingHasMore from '../../../../components/LoadingHasMore';
import useClickOutSide from '../../../../hook/useClickOutSide';
import styles from './Comments.module.css';
function Comments({ videoId, ownerId, ownerName, ownerAvatar, handleSetShowComment }) {
    const commentRef = useRef(null);
    const bodyRef = useRef(null);
    const isReset = useRef(true);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [params, setPrams] = useState({
        page: 1,
        limit: 10,
        totalPage: 1,
        totalComment: 0,
        orderBy: 'cmt_id',
        orderType: 'DESC',
    });
    const [elementRef, isShow, setShow] = useClickOutSide();
    const fetchCommentList = async (page, orderType) => {
        setIsLoading(true);
        const formData = {
            _video_id: videoId,
            _parent_id: 0,
            _page: page || params.page,
            _limit: params.limit,
            _order_by: params.orderBy,
            _order_type: orderType || params.orderType,
        };
        const response = await commentApi.get(formData);
        if (isReset.current) {
            setCommentList(response.commentList);
        } else {
            setCommentList([...commentList, ...response.commentList]);
        }
        setPrams({
            ...params,
            orderType: orderType || params.orderType,
            page: response.page + 1,
            limit: response.limit,
            totalPage: response.totalPage,
            totalComment: response.totalComment,
        });
        setIsLoading(false);
        setHasMore(false);
        isReset.current = false;
    };
    useEffect(() => {
        fetchCommentList();
    }, []);
    const handleAddCommentSuccess = (data) => {
        const arr = [...commentList];
        if (params.page <= params.totalPage) {
            arr.pop();
        }
        if (arr[0]?.cmt_pin) {
            const dataNew = [arr[0], data];
            arr.shift();
            setCommentList([...dataNew, ...arr]);
        } else {
            arr.unshift(data);
            setCommentList(arr);
        }
        setPrams({ ...params, totalComment: params.totalComment + 1 });
    };
    const handleDeleteCommentSuccess = (index) => {
        const arr = [...commentList];
        arr.splice(index, 1);
        setCommentList(arr);
        setPrams({ ...params, totalComment: params.totalComment - 1 });
    };
    const handleUpdateCommentSuccess = (index, content, timestamp) => {
        const arr = [...commentList];
        arr[index].cmt_content = content;
        arr[index].cmt_updated_at = timestamp;
        arr[index].cmt_edited = true;
        setCommentList(arr);
    };
    const handleResetComments = () => {
        isReset.current = true;
        fetchCommentList(1);
    };
    const handleChangeFilter = (type) => {
        isReset.current = true;
        setShow(false);
        fetchCommentList(1, type);
    };

    const handleInfiniteScroll = async () => {
        const bodyEl = bodyRef.current;
        const scrollTop = bodyEl.scrollTop;
        const scrollHeight = Math.floor(scrollTop + bodyEl.clientHeight);
        const clientHeight = Math.floor(bodyEl.scrollHeight - 50);
        if (scrollHeight >= clientHeight) {
            setHasMore(true);
        }
    };
    useEffect(() => {
        if (hasMore && !isLoading && params.page <= params.totalPage) {
            fetchCommentList();
        }
    }, [hasMore]);
    useEffect(() => {
        if (bodyRef.current) {
            const bodyEl = bodyRef.current;
            bodyEl.addEventListener('scroll', handleInfiniteScroll);
            return () => {
                bodyEl.removeEventListener('scroll', handleInfiniteScroll);
            };
        }
    }, []);

    return (
        <div className={clsx(styles.wrapper)} ref={commentRef}>
            <div className={clsx(styles.container)}>
                <div className={clsx(styles.heading)}>
                    <div className={clsx(styles.left)}>
                        <h3>Bình luận</h3>
                        <span>{params.totalComment}</span>
                    </div>
                    <div className={clsx(styles.right)}>
                        <div
                            className={clsx(styles.filter)}
                            ref={elementRef}
                            onClick={() => setShow(!isShow)}
                        >
                            <AlignLeft strokeWidth={1} size={25} />
                            {isShow && (
                                <>
                                    <div className={clsx(styles.overlay)}></div>
                                    <ul className={clsx(styles.filterMenu)}>
                                        <li
                                            className={clsx({
                                                [styles.active]: params.orderType === 'DESC',
                                            })}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleChangeFilter('DESC');
                                            }}
                                        >
                                            Mới nhất xếp trước
                                        </li>
                                        <li
                                            className={clsx({
                                                [styles.active]: params.orderType === 'ASC',
                                            })}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleChangeFilter('ASC');
                                            }}
                                        >
                                            Cũ nhất xếp trước
                                        </li>
                                    </ul>
                                </>
                            )}
                        </div>
                        <div className={clsx(styles.close)} onClick={handleSetShowComment}>
                            <X strokeWidth={1} size={25} />
                        </div>
                    </div>
                </div>
                <div className={clsx(styles.body)} ref={bodyRef}>
                    <div className={clsx(styles.form)}>
                        <Form
                            isUpdate
                            hostUserId={ownerId}
                            videoId={videoId}
                            handleAddCommentSuccess={handleAddCommentSuccess}
                        />
                    </div>
                    <div className={clsx(styles.commentList)}>
                        <div className={clsx(styles.test)}></div>
                        {!isReset.current &&
                            commentList.map((item, index) => (
                                <CommentGroup
                                    key={item.cmt_id}
                                    item={item}
                                    index={index}
                                    videoId={videoId}
                                    ownerId={ownerId}
                                    ownerName={ownerName}
                                    ownerAvatar={ownerAvatar}
                                    handleDeleteCommentSuccess={handleDeleteCommentSuccess}
                                    handleUpdateCommentSuccess={handleUpdateCommentSuccess}
                                    handleResetComments={handleResetComments}
                                    commentRef={commentRef}
                                />
                            ))}
                        {isLoading && <LoadingHasMore customStyle={{ marginTop: '10px' }} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comments;
