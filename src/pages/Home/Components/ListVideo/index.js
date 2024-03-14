import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import Item from './Item';
import VideoCardLoading from '../../../../components/VideoCard/Loading';
import videoApi from '../../../../api/videoApi';
import NoResult from '../../../../components/NoResult';
import LoadingHasMore from '../../../../components/LoadingHasMore';
import styles from './ListVideo.module.css';
function ListVideo({ categoryId, isLoadingHome, setIsLoadingHome }) {
    const [isLoadingFirst, setIsLoadingFirst] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [videoList, setVideoList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const isChangeCategory = useRef(false);
    const fetchVideos = async () => {
        setIsLoading(true);
        const obj = {
            video_type: '0',
            type: 'category_id',
            id: categoryId,
            page: isChangeCategory.current ? 1 : page,
            limit: 20,
        };
        const response = await videoApi.get(obj);
        if (isChangeCategory.current) {
            setVideoList(response.videoList);
            window.scrollTo(0, 0);
        } else {
            setVideoList((state) => [...state, ...response.videoList]);
        }
        setPage(response.page + 1);
        setTotalPage(response.totalPage);
        setIsLoading(false);
        setHasMore(false);
        setIsLoadingHome(false);
        setIsLoadingFirst(false);
        isChangeCategory.current = false;
    };
    const handleInfiniteScroll = async () => {
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const percent = Math.floor(((scrollTop + 300) / (scrollHeight - clientHeight)) * 100);
        if (percent >= 100) {
            setHasMore(true);
        }
    };
    useEffect(() => {
        isChangeCategory.current = true;
        fetchVideos();
    }, [categoryId]);
    useEffect(() => {
        if (hasMore && !isLoading && page <= totalPage) {
            fetchVideos();
        }
    }, [hasMore]);
    useEffect(() => {
        window.addEventListener('scroll', handleInfiniteScroll);
        return () => {
            window.removeEventListener('scroll', handleInfiniteScroll);
        };
    }, []);
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.videoList)}>
                {videoList.map((item, index) => (
                    <Item item={item} key={item.video_id} />
                ))}
                {!isLoading && !videoList.length && (
                    <NoResult text="Không tìm thấy video nào. Hãy thử tìm kiếm theo danh mục khác" />
                )}
                {isLoading && !isLoadingHome && !isLoadingFirst && <LoadingHasMore />}
                {isLoadingFirst &&
                    Array(4)
                        .fill(0)
                        .map((item, index) => (
                            <div className={clsx(styles.item)} key={index}>
                                <VideoCardLoading />
                            </div>
                        ))}
            </div>
        </div>
    );
}

export default ListVideo;
