import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import Loading from './Loading';
import NoResult from '../../../components/NoResult';
import subscriptionApi from '../../../api/subscriptionApi';
import { useState } from 'react';
import { useEffect } from 'react';
import Item from './Item';
import LoadingHasMore from '../../../components/LoadingHasMore';
import { addToastMessage } from '../../../store/actions/toastMessage';
import { deleteSubscription } from '../../../store/actions/subscription';
import styles from './Channels.module.css';
function Channels() {
    const [isLoadingFirst, setIsLoadingFirst] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const [params, setParams] = useState({
        type: 'user_statistical',
        page: 1,
        totalPage: 1,
    });
    const [subList, setSubList] = useState([]);
    const dispatch = useDispatch();

    const fetchSubList = async () => {
        setIsLoading(true);
        const formData = {
            _type: params.type,
            _page: params.page,
        };
        const response = await subscriptionApi.showSubscribed(formData);

        setSubList([...subList, ...response.list]);
        setParams({
            ...params,
            page: response.page + 1,
            totalPage: response.totalPage,
        });
        setHasMore(false);
        setIsLoading(false);
        setIsLoadingFirst(false);
    };
    const handleClickUnsubscribe = async (userId, index) => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);
        const params = new FormData();
        params.append('_id', userId);
        const response = await subscriptionApi.unsubscribe(params);

        if (response[0].error) {
            dispatch(addToastMessage('error', 'Thất bại', response[0].message));
        } else {
            dispatch(addToastMessage('success', 'Thành công', response[0].message));
            dispatch(deleteSubscription(userId));
            const newArray = [...subList];
            newArray.splice(index, 1);
            setSubList(newArray);
        }
        setIsLoading(false);
    };
    const handleInfiniteScroll = async () => {
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const percent = Math.floor(((scrollTop + 200) / (scrollHeight - clientHeight)) * 100);
        if (percent >= 100) {
            setHasMore(true);
        }
    };
    useEffect(() => {
        if (hasMore && !isLoading && params.page <= params.totalPage) {
            fetchSubList();
        }
    }, [hasMore]);
    useEffect(() => {
        window.addEventListener('scroll', handleInfiniteScroll);
        return () => {
            window.removeEventListener('scroll', handleInfiniteScroll);
        };
    }, []);
    useEffect(() => {
        fetchSubList();
    }, []);
    return (
        <div
            className={clsx(styles.wrapper, {
                [styles.overlay]: isLoading && !isLoadingFirst,
            })}
        >
            {isLoadingFirst && <Loading />}
            {!isLoadingFirst && subList.length > 0 && (
                <div className={clsx(styles.heading)}>
                    <h3>Tất cả kênh đã đăng ký</h3>
                </div>
            )}
            {!isLoadingFirst &&
                subList.length > 0 &&
                subList.map((item, index) => (
                    <Item
                        key={item.subscribe_id}
                        item={item}
                        index={index}
                        handleClickUnsubscribe={handleClickUnsubscribe}
                    />
                ))}

            {!isLoading && subList.length === 0 && <NoResult text="Bạn chưa đăng ký kênh nào." />}
            {hasMore && params.page <= params.totalPage && <LoadingHasMore />}
        </div>
    );
}

export default Channels;
