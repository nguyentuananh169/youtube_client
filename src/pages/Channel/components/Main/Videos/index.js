import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import VideoCard from '../../../../../components/VideoCard';
import VideoCardLoading from '../../../../../components/VideoCard/Loading';
import videoApi from '../../../../../api/videoApi';
import LoadingHasMore from '../../../../../components/LoadingHasMore';
import NoData from '../components/NoData';
import styles from './Videos.module.css';
function Videos() {
    const [btnType, setBtnType] = useState(true);
    const [videoList, setVideoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingFirst, setIsLoadingFirst] = useState(true);
    const [isLoadingBtnType, setIsLoadingBtnType] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [params, setParams] = useState({
        order_by: 'video_id',
        order_type: 'DESC',
        page: 1,
        totalPage: 1,
    });
    const listContainerRef = useRef(null);
    const isResetVideoList = useRef(false);
    const { id, page } = useParams();
    const auth = useSelector((state) => state.auth);

    const fetchVideoList = async (pageValue, objParams = {}) => {
        setIsLoading(true);
        const formData = {
            type: 'user_id',
            id: id,
            page: pageValue || params.page,
            limit: 20,
            order_by: objParams.order_by || params.order_by,
            order_type: objParams.order_type || params.order_type,
        };
        const response = await videoApi.get(formData);
        if (isResetVideoList.current) {
            setVideoList(response.videoList);
        } else {
            setVideoList([...videoList, ...response.videoList]);
        }
        setParams({
            page: response.page + 1,
            totalPage: response.totalPage,
            order_by: formData.order_by,
            order_type: formData.order_type,
        });
        isResetVideoList.current = false;
        setIsLoading(false);
        setHasMore(false);
        setIsLoadingFirst(false);
        setIsLoadingBtnType(false);
    };
    useEffect(() => {
        if (id && page === 'videos' && isLoadingFirst) {
            fetchVideoList();
        }
    }, [page, id, isLoadingFirst]);
    useEffect(() => {
        isResetVideoList.current = true;
        setHasMore(false);
        setIsLoading(true);
        setIsLoadingFirst(true);
        setBtnType(true);
        setParams({
            page: 1,
            totalPage: 1,
        });
    }, [id]);
    const handleClickButton = (boolean) => {
        if (btnType === boolean) {
            return;
        }
        setIsLoadingBtnType(true);
        setBtnType(boolean);
        isResetVideoList.current = true;
        const obj = {
            order_by: boolean ? 'video_id' : 'video_views',
            order_type: 'DESC',
        };
        fetchVideoList(1, obj);
    };
    const handleInfiniteScroll = () => {
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const percent = Math.floor(((scrollTop + 180) / (scrollHeight - clientHeight)) * 100);
        if (percent >= 100) {
            setHasMore(true);
        }
    };
    useEffect(() => {
        if (page === 'videos' && hasMore && !isLoading && params.page <= params.totalPage) {
            fetchVideoList();
        }
    }, [hasMore]);
    useEffect(() => {
        window.addEventListener('scroll', handleInfiniteScroll);
        return () => {
            window.removeEventListener('scroll', handleInfiniteScroll);
        };
    }, []);
    return (
        <div className={clsx(styles.wrapper, { [styles.loading]: isLoadingBtnType })}>
            <div className={clsx(styles.category)}>
                {videoList.length > 0 && (
                    <>
                        <button
                            className={clsx({ [styles.active]: btnType })}
                            onClick={() => handleClickButton(true)}
                        >
                            Mới nhất
                        </button>
                        <button
                            className={clsx({ [styles.active]: !btnType })}
                            onClick={() => handleClickButton(false)}
                        >
                            Phổ biến
                        </button>
                    </>
                )}
            </div>
            <div ref={listContainerRef} className={clsx(styles.listContainer)}>
                <div className={clsx(styles.list)}>
                    {!isLoadingFirst &&
                        videoList.map((item) => (
                            <div key={item.video_id} className={clsx(styles.videoCard)}>
                                <VideoCard hidenOwner item={item} />
                            </div>
                        ))}
                    {isLoading &&
                        isLoadingFirst &&
                        !isLoadingBtnType &&
                        Array(4)
                            .fill(0)
                            .map((item, index) => (
                                <div key={index} className={clsx(styles.videoCard)}>
                                    <VideoCardLoading key={index} hidenOwner />
                                </div>
                            ))}
                    {hasMore && isLoading && !isLoadingFirst && <LoadingHasMore />}
                    {!isLoading && videoList.length === 0 && (
                        <NoData
                            heading="Tải một video lên để bắt đầu"
                            text="Bắt đầu chia sẻ câu chuyện của bạn và kết nối với người xem. Các video mà bạn tải
                    lên sẽ xuất hiện ở đây."
                            textLink="Tải video lên"
                            link="/studio/videos/upload?type=upload_video"
                            textBottom="Tìm hiểu thêm về"
                            linkBottom="cách bắt đầu"
                            isBtn={auth.isLogin && auth.user?.user_id === id}
                            textSpan="Kênh này chưa có video nào."
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Videos;
