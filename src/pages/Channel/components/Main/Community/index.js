import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import Card from './Card';
import NoData from '../components/NoData';
import Form from './Form';
import postsApi from '../../../../../api/postsApi';
import LoadingHasMore from '../../../../../components/LoadingHasMore';
import { addToastMessage } from '../../../../../store/actions/toastMessage';
import styles from './Community.module.css';
function Community({ user }) {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const [postsList, setPostsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingFirst, setIsLoadingFirst] = useState(true);
    const [params, setPrams] = useState({
        count: 0,
        page: 1,
        totalPage: 1,
        limit: 10,
    });
    const [hasMore, setHasMore] = useState(false);
    const wrapperRef = useRef(null);
    const { id, page } = useParams();
    const isReset = useRef(false);
    const handleFetchPost = async (initPage) => {
        setIsLoading(true);
        const formData = {
            _type: 'get_by_user',
            _user_id: id,
            _page: initPage || params.page,
            _count: initPage ? 0 : params.count,
            _limit: params.limit,
        };
        const response = await postsApi.get(formData);

        if (isReset.current) {
            setPostsList(response.postsList);
        } else {
            setPostsList([...postsList, ...response.postsList]);
        }
        setPrams({
            ...params,
            count: 0,
            page: response.page + 1,
            totalPage: response.totalPage,
        });
        setIsLoading(false);
        setHasMore(false);
        setIsLoadingFirst(false);
    };
    useEffect(() => {
        if (id && page === 'community' && isLoadingFirst) {
            handleFetchPost();
        }
    }, [page, id, isLoadingFirst]);
    useEffect(() => {
        setIsLoadingFirst(true);
        setPrams({ count: 0, page: 1, totalPage: 1, limit: 10 });
        isReset.current = true;
        setHasMore(false);
        setIsLoading(false);
    }, [id]);
    const handleInfiniteScroll = async () => {
        const wrapperEl = wrapperRef.current;
        const screenHeight = window.innerHeight;
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        const scrollHeight = Math.floor(scrollTop + screenHeight);
        const clientHeight = Math.floor(
            wrapperEl.getBoundingClientRect().top + window.scrollY + wrapperEl.clientHeight,
        );
        if (scrollHeight >= clientHeight) {
            setHasMore(true);
        }
    };
    useEffect(() => {
        if (page === 'community' && hasMore && !isLoading && params.page <= params.totalPage) {
            handleFetchPost();
        }
    }, [hasMore]);
    useEffect(() => {
        window.addEventListener('scroll', handleInfiniteScroll);
        return () => {
            window.removeEventListener('scroll', handleInfiniteScroll);
        };
    }, []);
    const handleDelete = async (index, postId, postImg = []) => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);
        const formData = {
            _post_id: postId,
            _post_img: postImg,
        };
        const response = await postsApi.delete(formData);
        setIsLoading(false);
        if (response[0].error) {
            return dispatch(addToastMessage('error', 'Thất Bại', response[0].message));
        }
        const arr = [...postsList];
        arr.splice(index, 1);
        setPostsList(arr);
        if (params.page >= params.totalPage) {
            setPrams({ ...params, count: 0 });
        } else {
            setPrams({ ...params, count: params.count + 1 });
        }
        dispatch(addToastMessage('success', 'Thành công', response[0].message));
    };
    return (
        <div
            ref={wrapperRef}
            className={clsx(styles.wrapper, styles.noData, { [styles.loading]: isLoading })}
        >
            {auth.isLogin && user.user_id === auth.user?.user_id && (
                <Form user={user} handleFetchPost={handleFetchPost} />
            )}
            {!isLoading && postsList.length === 0 && (
                <NoData isBtn={false} textSpan="Kênh này chưa đăng bài." />
            )}
            {!isLoadingFirst &&
                postsList.map((item, index) => (
                    <Card
                        key={item.post_id}
                        item={item}
                        index={index}
                        isActiveMenu={auth.user?.user_id === item.user_id}
                        handleDelete={handleDelete}
                    />
                ))}
            {isLoading && <LoadingHasMore customStyle={{ marginTop: '20px' }} />}
        </div>
    );
}

export default Community;
