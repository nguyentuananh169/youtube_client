import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import Card from './Card';
import playlistApi from '../../../../../api/playlistApi';
import LoadingHasMore from '../../../../../components/LoadingHasMore';
import Loading from './Loading';
import NoData from '../components/NoData';
import styles from './PlayList.module.css';
function PlayList() {
    const [isLoading, setIsLoading] = useState(true);
    const [playlist, setPlaylist] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [isLoadingFirst, setIsLoadingFirst] = useState(true);
    const [params, setParams] = useState({
        page: 1,
        totalPage: 1,
    });
    const { id, page } = useParams();
    const isResetPlaylist = useRef(false);
    const auth = useSelector((state) => state.auth);
    const fetchPlaylist = async () => {
        setIsLoading(true);
        const formData = {
            type: 'user_id',
            keyword: id,
            limit: 20,
            page: params.page,
        };
        const response = await playlistApi.get(formData);
        if (isResetPlaylist.current) {
            setPlaylist(response.playlist);
        } else {
            setPlaylist([...playlist, ...response.playlist]);
        }
        setParams({
            page: response.page + 1,
            totalPage: response.totalPage,
        });
        setIsLoading(false);
        setIsLoadingFirst(false);
        setHasMore(false);
        isResetPlaylist.current = false;
    };
    useEffect(() => {
        if (id && page === 'playlist' && isLoadingFirst) {
            fetchPlaylist();
        }
    }, [page, id, isLoadingFirst]);
    useEffect(() => {
        isResetPlaylist.current = true;
        setHasMore(false);
        setIsLoading(true);
        setIsLoadingFirst(true);
        setParams({
            page: 1,
            totalPage: 1,
        });
    }, [id]);
    const handleInfiniteScroll = () => {
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const percent = Math.floor(((scrollTop + 200) / (scrollHeight - clientHeight)) * 100);
        if (percent >= 100) {
            setHasMore(true);
        }
    };
    useEffect(() => {
        if (page === 'playlist' && hasMore && !isLoading && params.page <= params.totalPage) {
            fetchPlaylist();
        }
    }, [hasMore, isLoading]);
    useEffect(() => {
        window.addEventListener('scroll', handleInfiniteScroll);
        return () => {
            window.removeEventListener('scroll', handleInfiniteScroll);
        };
    }, []);
    return (
        <div className={clsx(styles.wrapper)}>
            {!isLoading && playlist.length === 0 && (
                <NoData
                    heading="Thêm một danh sách phát"
                    text="Hãy thêm một danh sách phát để người xem có thể dễ dàng theo dõi. Các danh sách phát mà bạn thêm sẽ xuất hiện ở đây."
                    textLink="Thêm mới"
                    link="/studio/videos/playlist?type=add_playlist"
                    textBottom="Tìm hiểu thêm về"
                    linkBottom="cách bắt đầu"
                    isBtn={auth.isLogin && auth.user?.user_id === id}
                    textSpan="Kênh này chưa có danh sách phát nào."
                />
            )}
            {!isLoading && playlist.length > 0 && (
                <div className={clsx(styles.header)}>
                    <span>Danh sách phát đã tạo</span>
                </div>
            )}
            <div className={clsx(styles.list)}>
                {isLoadingFirst &&
                    Array(5)
                        .fill(0)
                        .map((item, index) => <Loading key={index} />)}
                {!isLoadingFirst &&
                    playlist.map((item) => <Card key={item.playlist_id} item={item} />)}
            </div>
            {hasMore && !isLoadingFirst && isLoading && <LoadingHasMore />}
        </div>
    );
}

export default PlayList;
