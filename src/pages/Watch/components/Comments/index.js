import { RxDotFilled } from 'react-icons/rx';
import { MdOutlineUnfoldMore } from 'react-icons/md';
import { TfiClose } from 'react-icons/tfi';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './Comments.module.css';
import Filter from './components/Filter';
import Form from './components/Form';
import DotMenu from '../../../../components/DotMenu';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import commentApi from '../../../../api/commentApi';
import postCommentApi from '../../../../api/postCommentApi';
import LoadingHasMore from '../../../../components/LoadingHasMore';
import CommentGroup from './components/CommentGroup';
function Comments({ isPostsPage = false, ownerId, ownerName, ownerAvatar, loadingPage }) {
    const [isShow, setIsShow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [totalComment, setTotalComment] = useState(0);
    const [commentList, setCommentList] = useState([]);
    const [params, setParams] = useState({
        page: 1,
        totalPage: 1,
        order_by: 'cmt_id',
        order_type: 'DESC',
    });
    const [hasMore, setHasMore] = useState(false);
    const overlayRef = useRef(null);
    const isReset = useRef(false);
    const { search } = useLocation();
    const urlParams = queryString.parse(search);
    const mainRef = useRef(null);
    const fetchComments = async (pageValue, orderTypeValue) => {
        setIsLoading(true);
        const formData = {
            _page: pageValue || params.page,
            _totalPage: params.totalPage,
            _order_by: 'cmt_id',
            _order_type: orderTypeValue || params.order_type,
            _limit: 15,
        };
        if (isPostsPage) {
            formData._post_id = urlParams.id;
        } else {
            formData._video_id = urlParams.id;
        }
        const response = isPostsPage
            ? await postCommentApi.get(formData)
            : await commentApi.get(formData);
        if (isReset.current) {
            setCommentList(response.commentList);
        } else {
            setCommentList([...commentList, ...response.commentList]);
        }
        setTotalComment(response.totalComment);
        setParams({
            ...params,
            page: response.page + 1,
            totalPage: response.totalPage,
            order_type: orderTypeValue || params.order_type,
        });
        setIsLoading(false);
        setHasMore(false);
        isReset.current = false;
    };
    const handleResetComments = () => {
        isReset.current = true;
        fetchComments(1);
    };
    useEffect(() => {
        if (urlParams.id) {
            handleResetComments();
        }
    }, [urlParams.id]);
    useEffect(() => {
        if (isShow) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isShow]);
    const handleClickBtnComments = () => {
        if (!isShow) {
            setIsShow(true);
        }
    };
    const handleClickIcon = (e) => {
        e.stopPropagation();
        setIsShow(!isShow);
    };
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
        setTotalComment(totalComment + 1);
    };
    const handleDeleteCommentSuccess = (index) => {
        const arr = [...commentList];
        arr.splice(index, 1);
        setCommentList(arr);
        setTotalComment(totalComment - 1);
    };
    const handleUpdateCommentSuccess = (index, content, timestamp) => {
        const arr = [...commentList];
        arr[index].cmt_content = content;
        arr[index].cmt_updated_at = timestamp;
        arr[index].cmt_edited = true;
        setCommentList(arr);
    };
    const handleInfiniteScroll = async () => {
        const mainEl = mainRef.current;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        let scrollTop;
        let scrollHeight;
        let clientHeight;
        if (screenWidth <= 768 && !isPostsPage) {
            scrollTop = mainEl.scrollTop;
            scrollHeight = Math.floor(scrollTop + mainEl.clientHeight);
            clientHeight = Math.floor(mainEl.scrollHeight - 50);
        } else if (screenWidth > 1024 || isPostsPage) {
            scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            scrollHeight = Math.floor(scrollTop + screenHeight);
            clientHeight = Math.floor(
                mainEl.getBoundingClientRect().top + window.scrollY + mainEl.clientHeight,
            );
        }
        if (
            scrollHeight >= clientHeight &&
            (screenWidth <= 768 || screenWidth > 1024 || isPostsPage)
        ) {
            setHasMore(true);
        }
    };
    const handleClickBtnMore = () => {
        if (!isLoading) {
            fetchComments();
        }
    };
    useEffect(() => {
        if (hasMore && !isLoading && params.page <= params.totalPage) {
            fetchComments();
        }
    }, [hasMore]);
    useEffect(() => {
        if (window.innerWidth <= 768 && !isPostsPage) {
            const mailEl = mainRef.current;
            mailEl.addEventListener('scroll', handleInfiniteScroll);
            return () => {
                mailEl.removeEventListener('scroll', handleInfiniteScroll);
            };
        } else if (window.innerWidth > 1024 || isPostsPage) {
            window.addEventListener('scroll', handleInfiniteScroll);
            return () => {
                window.removeEventListener('scroll', handleInfiniteScroll);
            };
        }
    }, []);
    const handleChangeTypeFilter = (type) => {
        if (params.order_type !== type) {
            isReset.current = true;
            setParams({ ...params, order_type: type });
            fetchComments(1, type);
        }
    };
    return (
        <>
            {isShow && <div ref={overlayRef} className={clsx(styles.overlay)}></div>}
            <div
                className={clsx(styles.wrapper, {
                    [styles.show]: isShow,
                    [styles.postsPage]: isPostsPage,
                })}
            >
                <div className={clsx(styles.btnComments)} onClick={handleClickBtnComments}>
                    <div className={clsx(styles.text)}>
                        <span>Bình luận</span>
                        {!isShow && <RxDotFilled size={10} />}
                        <span>{totalComment}</span>
                    </div>

                    <div className={clsx(styles.icon)} onClick={handleClickIcon}>
                        {isShow ? (
                            <DotMenu icon={<TfiClose size={20} color="#606060" />} />
                        ) : (
                            <MdOutlineUnfoldMore size={20} color="#606060" />
                        )}
                    </div>
                </div>
                <div ref={mainRef} className={clsx(styles.main)}>
                    <Filter
                        totalComment={totalComment}
                        handleChangeTypeFilter={handleChangeTypeFilter}
                    />
                    <Form
                        isPostsPage={isPostsPage}
                        handleAddCommentSuccess={handleAddCommentSuccess}
                    />

                    {!isReset.current &&
                        commentList.map((item, index) => (
                            <CommentGroup
                                key={
                                    item?.type === 'add'
                                        ? `${item.cmt_id}${item.cmt_time}`
                                        : item.cmt_id
                                }
                                isPostsPage={isPostsPage}
                                index={index}
                                item={item}
                                ownerId={ownerId}
                                videoId={urlParams.id}
                                ownerName={ownerName}
                                ownerAvatar={ownerAvatar}
                                handleDeleteCommentSuccess={handleDeleteCommentSuccess}
                                handleUpdateCommentSuccess={handleUpdateCommentSuccess}
                                handleResetComments={handleResetComments}
                                commentRef={mainRef}
                            />
                        ))}
                    {isLoading && <LoadingHasMore />}
                    <div
                        className={clsx(styles.btnMore, {
                            [styles.loading]: isLoading,
                            [styles.show]:
                                !loadingPage &&
                                !isPostsPage &&
                                window.innerWidth > 768 &&
                                window.innerWidth <= 1024 &&
                                params.page <= params.totalPage,
                        })}
                        onClick={handleClickBtnMore}
                    >
                        <button>{isLoading ? 'Đang tải...' : 'Xem thêm'}</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Comments;
