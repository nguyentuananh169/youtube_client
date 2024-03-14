import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import { BsArrowReturnRight } from 'react-icons/bs';

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Item from '../Item';
import commentApi from '../../../../../../api/commentApi';
import postCommentApi from '../../../../../../api/postCommentApi';
import LoadingHasMore from '../../../../../../components/LoadingHasMore';
import styles from './CommentGroup.module.css';
function CommentGroup({
    isPostsPage,
    item,
    index,
    videoId,
    ownerId,
    ownerName,
    ownerAvatar,
    handleDeleteCommentSuccess,
    handleUpdateCommentSuccess,
    handleResetComments,
    commentRef,
}) {
    const [isShowReply, setIsShowReply] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingFirst, setIsLoadingFirst] = useState(true);
    const [commentList, setCommentList] = useState([]);
    const [count, setCount] = useState(0);
    const [params, setParams] = useState({
        page: 1,
        totalPage: 1,
        limit: 10,
    });
    const fetchCommentReply = async () => {
        if (!videoId) {
            return;
        }
        setIsLoading(true);
        const formData = {
            _parent_id: item.cmt_id,
            _page: params.page,
            _order_type: 'ASC',
            _limit: params.limit,
        };
        if (isPostsPage) {
            formData._post_id = videoId;
        } else {
            formData._video_id = videoId;
        }
        const response = isPostsPage
            ? await postCommentApi.get(formData)
            : await commentApi.get(formData);
        setCommentList([...commentList, ...response.commentList]);
        setParams({ page: response.page + 1, totalPage: response.totalPage });
        setIsLoading(false);
        setIsLoadingFirst(false);
    };
    useEffect(() => {
        if (isLoadingFirst && isShowReply) {
            fetchCommentReply();
        }
    }, [isShowReply]);
    const handleAddSuccess = (data) => {
        if (params.page > params.totalPage) {
            const arr = [...commentList];
            arr.push(data);
            setCommentList(arr);
        }
        setCount(count + 1);
    };
    const handleDeleteSuccess = (index) => {
        const arr = [...commentList];
        arr.splice(index, 1);
        setCommentList(arr);
        setCount(count - 1);
    };
    const handleUpdateSuccess = (index, content, timestamp) => {
        const arr = [...commentList];
        arr[index].cmt_content = content;
        arr[index].cmt_updated_at = timestamp;
        arr[index].cmt_edited = true;
        setCommentList(arr);
    };
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.comment)}>
                <Item
                    isPostsPage={isPostsPage}
                    item={item}
                    index={index}
                    handleAddSuccess={handleAddSuccess}
                    ownerId={ownerId}
                    ownerName={ownerName}
                    ownerAvatar={ownerAvatar}
                    handleDeleteCommentSuccess={handleDeleteCommentSuccess}
                    handleResetComments={handleResetComments}
                    handleUpdateCommentSuccess={handleUpdateCommentSuccess}
                    commentRef={commentRef}
                    videoId={videoId}
                />
            </div>

            {+item.count_reply + count > 0 && (
                <div
                    className={clsx(styles.btnMore, { [styles.active]: isShowReply })}
                    onClick={() => setIsShowReply(!isShowReply)}
                >
                    <button>
                        {isShowReply ? (
                            <AiOutlineCaretUp size={15} />
                        ) : (
                            <AiOutlineCaretDown size={15} />
                        )}
                        {`${+item.count_reply + count} phản hồi`}
                    </button>
                </div>
            )}

            <div
                className={clsx(styles.comment, styles.children, {
                    [styles.show]: isShowReply,
                })}
            >
                {commentList.map((item, index) => (
                    <Item
                        key={item.cmt_id}
                        isPostsPage={isPostsPage}
                        isLv2
                        item={item}
                        videoId={videoId}
                        index={index}
                        ownerId={ownerId}
                        ownerName={ownerName}
                        ownerAvatar={ownerAvatar}
                        handleAddSuccess={handleAddSuccess}
                        handleDeleteCommentSuccess={handleDeleteSuccess}
                        handleUpdateCommentSuccess={handleUpdateSuccess}
                    />
                ))}
            </div>
            {isLoading && <LoadingHasMore />}
            {isShowReply && !isLoading && !isLoadingFirst && params.page <= params.totalPage && (
                <div
                    className={clsx(styles.btnMore)}
                    onClick={(e) => (e.stopPropagation(), fetchCommentReply())}
                >
                    <button>
                        <BsArrowReturnRight size={17} />
                        {`Hiện thêm phản hồi`}
                    </button>
                </div>
            )}
        </div>
    );
}

export default CommentGroup;
