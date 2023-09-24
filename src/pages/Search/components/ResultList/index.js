import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import VideoResults from './VideoResults';
import UserResults from './UserResults';
import VideoCardLoading from '../../../../components/VideoCard/Loading';
import UserLoading from '../ResultList/UserResults/Loading';
import Loading from './Loading';
import NoResult from '../../../../components/NoResult';
import PlayListResult from './PlayListResult';
import videoApi from '../../../../api/videoApi';
import userApi from '../../../../api/userApi';
import playlistApi from '../../../../api/playlistApi';
import styles from './ResultList.module.css';
function ResultList({ categoryId, isLoadingPage, setIsLoadingPage }) {
    const [isLoadingFirst, setIsLoadingFirst] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [resultList, setResultList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const isChangeCategory = useRef(false);
    const { keyword } = useParams();
    const fetchVideos = async () => {
        setIsLoading(true);
        const obj = {
            type: 'search',
            keyword: keyword,
            page: isChangeCategory.current ? 1 : page,
            limit: 20,
        };
        const response = await videoApi.get(obj);
        if (hasMore && !isLoadingPage) {
            setResultList((state) => [...state, ...response.videoList]);
        } else {
            setResultList(response.videoList);
            window.scrollTo(0, 0);
        }
        setPage(response.page + 1);
        setTotalPage(response.totalPage);
        setIsLoadingPage(false);
        setIsLoading(false);
        setHasMore(false);
        setIsLoadingFirst(false);
        isChangeCategory.current = false;
    };
    const fetchUser = async () => {
        setIsLoading(true);
        const obj = {
            _type: 'search',
            _search_type: 'user_name',
            _keyword: keyword,
            _page: isChangeCategory.current ? 1 : page,
            _limit: 20,
        };
        const response = await userApi.get(obj);
        if (hasMore && !isChangeCategory.current) {
            setResultList((state) => [...state, ...response.userList]);
        } else {
            setResultList(response.userList);
            window.scrollTo(0, 0);
        }
        setPage(response.page + 1);
        setTotalPage(response.totalPage);
        setIsLoadingPage(false);
        setIsLoading(false);
        setHasMore(false);
        setIsLoadingFirst(false);
        isChangeCategory.current = false;
    };
    const fetchPlaylist = async () => {
        setIsLoading(true);
        const obj = {
            _keyword: keyword,
            _page: isChangeCategory.current ? 1 : page,
            _limit: 20,
        };
        const response = await playlistApi.search(obj);
        if (hasMore && !isChangeCategory.current) {
            setResultList((state) => [...state, ...response.userList]);
        } else {
            setResultList(response.playlist);
            window.scrollTo(0, 0);
        }
        setPage(response.page + 1);
        setTotalPage(response.totalPage);
        setIsLoadingPage(false);
        setIsLoading(false);
        setHasMore(false);
        setIsLoadingFirst(false);
        isChangeCategory.current = false;
    };
    const fetchlive = () => {
        setIsLoadingPage(false);
        setIsLoading(false);
        setHasMore(false);
        setIsLoadingFirst(false);
        isChangeCategory.current = false;
    };
    const handleFetchData = () => {
        switch (categoryId) {
            case 'user':
                fetchUser();
                break;
            case 'playlist':
                fetchPlaylist();
                break;
            case 'live':
                fetchlive();
                break;

            default:
                fetchVideos();
                break;
        }
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
        setResultList([]);
        handleFetchData();
    }, [keyword, categoryId]);
    useEffect(() => {
        if (categoryId !== 'playlist' && categoryId !== 'live') {
            setIsLoadingFirst(true);
            setIsLoadingPage(true);
        }
    }, [keyword]);
    useEffect(() => {
        if (hasMore && !isLoading && page <= totalPage) {
            handleFetchData();
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
            {!isLoadingFirst && resultList.length > 0 && (
                <div className={clsx(styles.title)}>
                    <h3>Kết quả hàng đầu</h3>
                </div>
            )}
            {categoryId === '' && !isLoadingPage && <VideoResults resultList={resultList} />}
            {categoryId === 'user' && !isLoadingPage && <UserResults resultList={resultList} />}
            {categoryId === 'playlist' && !isLoadingPage && (
                <PlayListResult resultList={resultList} />
            )}
            {!isLoading && !resultList.length && (
                <NoResult text="Không tìm thấy video nào. Hãy thử tìm kiếm với từ khóa khác" />
            )}
            {(isLoadingFirst || isLoadingPage) &&
                categoryId !== 'user' &&
                Array(2)
                    .fill(0)
                    .map((item, index) => <VideoCardLoading key={index} isPreview row showDes />)}
            {(isLoadingFirst || isLoadingPage) &&
                categoryId === 'user' &&
                Array(2)
                    .fill(0)
                    .map((item, index) => <UserLoading key={index} />)}
            {isLoading && hasMore && !isLoadingPage && <Loading />}
        </div>
    );
}

export default ResultList;
