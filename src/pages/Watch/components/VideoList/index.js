import { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import VideoCard from '../../../../components/VideoCard';
import VideoCardLoading from '../../../../components/VideoCard/Loading';
import FilterSlider from '../../../../components/FilterSlider';
import SkeletonLoading from '../../../../components/SkeletonLoading';
import videoApi from '../../../../api/videoApi';
import LoadingHasMore from '../../../../components/LoadingHasMore';
import useStore from '../../../../hook/useStore';
import styles from './VideoList.module.css';
import { nextVideoInfo } from '../../../../store/actions';
function VideoList({ urlParams, loadingPage, userId, userName }) {
    const filterData = [
        { id: 'category_id', name: 'Tất cả' },
        { id: 'user_id', name: `Video của ${userName}` },
        { id: 'hot', name: 'Video phổ biến' },
        { id: 'live', name: 'Trực tiếp' },
    ];
    const [isVideoColumn, setIsVideoColumn] = useState(false);
    const [width, setWidth] = useState(0);
    const [videoList, setVideoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const [params, setParams] = useState({
        type: 'category_id',
        id: urlParams.category,
        order_by: '',
        order_type: '',
        page: 1,
        totalPage: 1,
        limit: 10,
    });
    const isResetVideoList = useRef(false);
    const wrapperRef = useRef(null);
    const [, dispatch] = useStore();
    const fetchVideoList = async (obj = {}) => {
        setIsLoading(true);
        const formData = {
            ...params,
            ...obj,
            black_list_name: urlParams.list ? 'playlist_id' : 'video_id',
            black_list_value: urlParams.list ? urlParams.list : urlParams.id,
            page: isResetVideoList.current ? 1 : params.page,
        };
        const response = await videoApi.get(formData);
        if (isResetVideoList.current) {
            setVideoList(response.videoList);
        } else {
            setVideoList([...videoList, ...response.videoList]);
        }
        setParams({ ...formData, page: response.page + 1, totalPage: response.totalPage });
        setHasMore(false);
        setIsLoading(false);
        isResetVideoList.current = false;
    };
    useEffect(() => {
        if (videoList.length > 0 && !urlParams.list) {
            const count = videoList.length;
            const randomIndex = Math.floor(Math.random() * count);
            dispatch(
                nextVideoInfo({
                    type: 'video_list',
                    id: videoList[randomIndex]?.video_id,
                    categoryId: videoList[randomIndex]?.category_id,
                    title: videoList[randomIndex]?.video_title,
                    poster: videoList[randomIndex]?.video_poster,
                    userName: videoList[randomIndex]?.user_name,
                }),
            );
        }
    }, [videoList]);
    const handleChangeFilter = (id) => {
        switch (id) {
            case 'user_id':
                if (params.type !== id) {
                    isResetVideoList.current = true;
                    fetchVideoList({
                        type: id,
                        id: userId,
                        order_by: '',
                        order_type: '',
                    });
                }
                break;
            case 'category_id':
                if (params.type !== id || params.id !== urlParams.category) {
                    isResetVideoList.current = true;
                    fetchVideoList({
                        type: id,
                        id: urlParams.category,
                        order_by: '',
                        order_type: '',
                    });
                }
                break;
            case 'hot':
                if (params.order_by !== 'video_views') {
                    isResetVideoList.current = true;
                    fetchVideoList({
                        type: 'category_id',
                        id: urlParams.category,
                        order_by: 'video_views',
                        order_type: 'DESC',
                    });
                }
                break;
            case 'live':
                if (params.id !== 'live') {
                    isResetVideoList.current = true;
                    fetchVideoList({
                        type: 'category_id',
                        id: id,
                        order_by: '',
                        order_type: '',
                    });
                }
                break;
            default:
                break;
        }
    };
    const handleInfiniteScroll = async () => {
        if (wrapperRef.current) {
            const wrapperEl = wrapperRef.current;
            const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            const screenHeight = window.innerHeight;
            const scrollHeight = Math.floor(scrollTop + screenHeight);
            const clientHeight = Math.floor(
                wrapperEl.getBoundingClientRect().top + window.scrollY + wrapperEl.clientHeight,
            );
            const screenWidth = window.innerWidth;
            if (scrollHeight >= clientHeight && (screenWidth <= 768 || screenWidth > 1024)) {
                setHasMore(true);
            }
        }
    };
    const handleClickBtnMore = () => {
        if (!isLoading) {
            fetchVideoList();
        }
    };
    useEffect(() => {
        if (hasMore && !isLoading && params.page <= params.totalPage) {
            fetchVideoList();
        }
    }, [hasMore]);
    useEffect(() => {
        window.addEventListener('scroll', handleInfiniteScroll);
        return () => {
            window.removeEventListener('scroll', handleInfiniteScroll);
        };
    }, []);
    useEffect(() => {
        if (urlParams.category) {
            isResetVideoList.current = true;
            fetchVideoList({
                type: 'category_id',
                id: urlParams.category,
                order_by: '',
                order_type: '',
            });
        }
    }, [urlParams.category, urlParams.id]);
    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth <= 1024 && screenWidth > 768) {
                setIsVideoColumn(true);
                setWidth('33.333%');
            } else if (screenWidth <= 768 && screenWidth > 520) {
                setIsVideoColumn(true);
                setWidth('50%');
            } else if (screenWidth <= 520) {
                setIsVideoColumn(true);
                setWidth('100%');
            } else {
                setIsVideoColumn(false);
                setWidth('100%');
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div
            ref={wrapperRef}
            className={clsx(styles.wrapper, {
                [styles.loading]: isResetVideoList.current && !loadingPage,
            })}
        >
            <div className={clsx(styles.filter)}>
                {loadingPage ? (
                    <SkeletonLoading height="32px" />
                ) : (
                    <FilterSlider itemList={filterData} handleClick={handleChangeFilter} />
                )}
            </div>
            <div className={clsx(styles.videoList, { [styles.videoColumn]: isVideoColumn })}>
                {!loadingPage &&
                    videoList.map((item) => (
                        <div
                            key={item.video_id}
                            className={clsx(styles.card)}
                            style={{ width: `calc(${width} - 5px)` }}
                        >
                            <VideoCard
                                item={item}
                                width={`${isVideoColumn ? '100%' : '168px'}`}
                                row={!isVideoColumn}
                            />
                        </div>
                    ))}
                {loadingPage && (
                    <div style={{ width: '100%', marginTop: '20px' }}>
                        {Array(3)
                            .fill(0)
                            .map((item, index) => (
                                <VideoCardLoading
                                    key={index}
                                    width={`${isVideoColumn ? '100%' : '168px'}`}
                                    row={!isVideoColumn}
                                />
                            ))}
                    </div>
                )}
            </div>
            {hasMore && isLoading && !loadingPage && (
                <LoadingHasMore customStyle={{ marginTop: '10px' }} />
            )}
            {!isLoading && videoList.length === 0 && (
                <p className={clsx(styles.noResult)}>Không có video phù hợp với yêu cầu</p>
            )}
            <div
                className={clsx(styles.btnMore, {
                    [styles.loading]: isLoading,
                    [styles.show]:
                        !loadingPage &&
                        window.innerWidth > 768 &&
                        window.innerWidth <= 1024 &&
                        params.page <= params.totalPage,
                })}
                onClick={handleClickBtnMore}
            >
                <button>{isLoading ? 'Đang tải...' : 'Xem thêm'}</button>
            </div>
        </div>
    );
}

export default VideoList;
