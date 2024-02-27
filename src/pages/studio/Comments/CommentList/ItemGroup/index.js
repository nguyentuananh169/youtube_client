import { BsArrowReturnRight } from 'react-icons/bs';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import Item from './Item';
import commentApi from '../../../../../api/commentApi';
import LoadingHasMore from '../../../../../components/LoadingHasMore';
import { addToastMessage } from '../../../../../store/actions/toastMessage';
import styles from './ItemGroup.module.css';
function ItemGroup({ item, index, handleUpdateCommentSuccess, handleDeleteCommentSuccess }) {
    const [isShowReply, setIsShowReply] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingFirst, setIsLoadingFirst] = useState(true);
    const [commentList, setCommentList] = useState([]);
    const [count, setCount] = useState(0);
    const [params, setParams] = useState({
        page: 1,
        limit: 10,
        totalPage: 0,
    });
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const handleSetShowReply = () => {
        setIsShowReply(!isShowReply);
    };
    const fetchCommentReply = async () => {
        if (!item.video_id) {
            return;
        }
        setIsLoading(true);
        const formData = {
            _video_id: item.video_id,
            _parent_id: item.cmt_id,
            _page: params.page,
            _order_type: 'ASC',
            _limit: params.limit,
        };
        const response = await commentApi.get(formData);
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
    const handleUpdateCommentSuccess2 = (index, content, time) => {
        const cmList = [...commentList];
        cmList[index].cmt_content = content;
        cmList[index].cmt_updated_at = time;
        cmList[index].cmt_edited = true;
        setCommentList(cmList);
    };
    const handleReplyCommentSuccess = (data) => {
        if ((isShowReply || !isLoadingFirst) && params.page > params.totalPage) {
            const arr = [...commentList];
            const obj = {
                ...data,
                user_tag: user.user_tag,
                user_avatar: user.user_avatar,
            };
            arr.push(obj);
            setCommentList(arr);
        }
        setCount(count + 1);
    };
    const handleDeleteCommentSuccess2 = (index) => {
        const arr = [...commentList];
        arr.splice(index, 1);
        setCommentList(arr);
        setCount(count - 1);
    };
    const hanldeDeleteComment = async (index, cmtId, parentId) => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);
        const params = {
            _cmt_id: cmtId,
            _cmt_parent_id: parentId,
        };
        const response = await commentApi.delete(params);
        setIsLoading(false);
        if (response[0].error) {
            return dispatch(addToastMessage('error', 'Thất bại', response[0].message));
        }
        dispatch(addToastMessage('success', 'Thành công', response[0].message));
        parentId > 0 ? handleDeleteCommentSuccess2(index) : handleDeleteCommentSuccess(index);
    };
    return (
        <div className={clsx(styles.wrapper)}>
            <Item
                count={count}
                item={item}
                index={index}
                handleReplyCommentSuccess={handleReplyCommentSuccess}
                handleUpdateCommentSuccess={handleUpdateCommentSuccess}
                handleSetShowReply={handleSetShowReply}
                hanldeDeleteComment={hanldeDeleteComment}
            />
            {isShowReply &&
                commentList.map((item2, index2) => (
                    <Item
                        key={item2.cmt_id}
                        lv2
                        item={item2}
                        index={index2}
                        handleReplyCommentSuccess={handleReplyCommentSuccess}
                        handleUpdateCommentSuccess={handleUpdateCommentSuccess2}
                        handleSetShowReply={handleSetShowReply}
                        hanldeDeleteComment={hanldeDeleteComment}
                    />
                ))}
            {isLoading && <LoadingHasMore customStyle={{ margin: '10px 0 10px 0' }} />}
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

export default ItemGroup;
