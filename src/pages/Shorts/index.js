import { ArrowLeft } from 'react-feather';

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import VideoCard from './VideoCard';
import Loading from './VideoCard/Loading';
import videoApi from '../../api/videoApi';
import LoadingHasMore from '../../components/LoadingHasMore';
import NoResult from '../../components/NoResult';
import styles from './Shorts.module.css';
function Shorts() {
    const wrapperRef = useRef(null);
    const timeoutRef = useRef(null);
    const videoRef = useRef(null);
    const videoListRef = useRef(null);
    const isReset = useRef(true);
    const isDragging = useRef(false);
    const isSetIndexActive = useRef(false);
    const timeMove = useRef(0);
    const intervalRef = useRef(null);
    const startY = useRef(0);
    const offsetY = useRef(0);
    const prevOffsetY = useRef(0);
    const [isMute, setIsMute] = useState(false);
    const [isLoadingFirst, setIsLoadingFirst] = useState(true);
    const [isHasMore, setIsHasMore] = useState(false);
    const [params, setParams] = useState({
        page: 1,
        limit: 10,
        totalPage: 1,
    });
    const [indexActive, setIndexActive] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [scrollTop, setScrollTop] = useState(0);
    const [videoList, setVideoList] = useState([]);
    const [screenWidthMobile, setScreenWidthMobile] = useState(window.innerWidth <= 768);
    const isTouchDevice =
        'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    const handleSetMute = () => {
        setIsMute(!isMute);
    };
    const fetchVideoList = async () => {
        setIsLoading(true);
        const formData = {
            type: 'video_type',
            search_type: 1,
            limit: params.limit,
            page: params.page,
        };
        const response = await videoApi.get(formData);
        setIsLoading(false);
        setIsLoadingFirst(false);
        if (isReset.current) {
            setVideoList(response.videoList);
        } else {
            setVideoList([...videoList, ...response.videoList]);
        }
        setParams({
            page: response.page + 1,
            limit: response.limit,
            totalPage: response.totalPage,
        });
        setIsHasMore(false);
        isReset.current = false;
    };
    useEffect(() => {
        fetchVideoList();
    }, []);
    const handleInfiniteScroll = () => {
        if (wrapperRef.current) {
            videoRef.current && videoRef.current.pause();
            const wrapperEl = wrapperRef.current;
            const scroll = document.body.scrollTop || document.documentElement.scrollTop;
            const screenHeight = window.innerHeight;
            const scrollHeight = Math.floor(scroll + screenHeight);
            const clientHeight = Math.floor(
                wrapperEl.getBoundingClientRect().top + window.scrollY + wrapperEl.clientHeight,
            );
            if (scrollHeight + screenHeight >= clientHeight) {
                setIsHasMore(true);
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                setScrollTop(scroll);
            }, 300);
        }
    };
    const handleResize = () => {
        const wrapperEl = wrapperRef.current;
        const height = window.innerHeight;
        wrapperEl.style.setProperty('--screenHeight', `${height.toFixed(3)}px`);
        setScreenWidthMobile(window.innerWidth <= 768);
    };
    const handleTouchmove = (e) => {
        if (!isDragging.current || !videoListRef.current) {
            return;
        }
        if (!intervalRef.current) {
            intervalRef.current = setInterval(() => {
                timeMove.current = timeMove.current + 1;
            }, 1000);
        }
        const wrapperEl = wrapperRef.current;
        const wrapperHeight = wrapperEl.clientHeight;
        const videoListEl = videoListRef.current;
        const videoListHeight = videoListEl.clientHeight;
        const currentY = e.clientY || e.touches[0].clientY;
        const delta = startY.current - currentY;
        if (
            prevOffsetY.current + delta > 0 &&
            prevOffsetY.current + delta + wrapperHeight <= videoListHeight
        ) {
            isSetIndexActive.current = true;
            offsetY.current = delta;
            const offsetTop = prevOffsetY.current + offsetY.current;
            videoListEl.style.top = `-${offsetTop}px`;
        } else {
            isSetIndexActive.current = false;
        }
    };
    const handleSetIndexVideo = (key) => {
        const videoListEl = videoListRef.current;
        const screenHeight = window.innerHeight;
        if (key === 'keep') {
            setIndexActive((state) => {
                const newIndex = state;
                const offsetTop = newIndex * screenHeight;
                videoListEl.style.top = `-${offsetTop}px`;
                prevOffsetY.current = offsetTop;
                return newIndex;
            });
        } else {
            if (offsetY.current > 0) {
                setIndexActive((state) => {
                    const newIndex = state + 1;
                    const offsetTop = newIndex * screenHeight;
                    videoListEl.style.top = `-${offsetTop}px`;
                    prevOffsetY.current = offsetTop;
                    return newIndex;
                });
            } else if (offsetY.current < 0) {
                setIndexActive((state) => {
                    const newIndex = state - 1;
                    const offsetTop = newIndex * screenHeight;
                    videoListEl.style.top = `-${offsetTop}px`;
                    prevOffsetY.current = offsetTop;
                    return newIndex;
                });
            }
        }
    };
    const handleTouchend = () => {
        isDragging.current = false;
        let type = '';
        const h = window.innerHeight / 3;
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        if (!isSetIndexActive.current) {
            return;
        }
        let temp = offsetY.current;
        if (temp < 0) {
            temp *= -1;
        }
        if (timeMove.current >= 1 && temp < h) {
            type = 'keep';
        }
        handleSetIndexVideo(type);
        offsetY.current = 0;
        timeMove.current = 0;
    };
    useEffect(() => {
        if (videoListRef.current && wrapperRef.current && isTouchDevice && screenWidthMobile) {
            const videoListEl = videoListRef.current;
            const videoListHeight = videoListEl.clientHeight;
            const screenHeight = window.innerHeight;
            const offsetTop = indexActive * screenHeight;
            if (offsetTop + screenHeight >= videoListHeight) {
                setIsHasMore(true);
            }
        }
    }, [isTouchDevice, screenWidthMobile, indexActive]);
    useEffect(() => {
        if (isHasMore && !isLoading && !isLoadingFirst && params.page <= params.totalPage) {
            fetchVideoList();
        }
    }, [isHasMore]);
    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    useEffect(() => {
        if (!isTouchDevice || !screenWidthMobile) {
            window.addEventListener('scroll', handleInfiniteScroll);
            return () => {
                window.removeEventListener('scroll', handleInfiniteScroll);
            };
        }
    }, [isTouchDevice, screenWidthMobile]);
    useEffect(() => {
        if (isTouchDevice && screenWidthMobile) {
            const handleTouchstart = (e) => {
                isDragging.current = true;
                startY.current = e.clientY || e.touches[0].clientY;
            };
            document.addEventListener('touchstart', handleTouchstart);
            document.addEventListener('touchmove', handleTouchmove);
            return () => {
                document.removeEventListener('touchstart', handleTouchstart);
                document.removeEventListener('touchmove', handleTouchmove);
            };
        }
    }, [isTouchDevice, screenWidthMobile]);
    useEffect(() => {
        if (isTouchDevice && screenWidthMobile) {
            document.addEventListener('touchend', handleTouchend);
            return () => {
                document.removeEventListener('touchend', handleTouchend);
            };
        }
    }, [isTouchDevice, screenWidthMobile]);

    return (
        <div
            className={clsx(styles.wrapper, {
                [styles.touchDevice]: isTouchDevice && screenWidthMobile,
            })}
            ref={wrapperRef}
        >
            <Link to={'/'} className={clsx(styles.goHome)}>
                <ArrowLeft size={20} color="#fff" />
            </Link>
            {isLoading && isLoadingFirst && <Loading />}
            <div className={clsx(styles.videoList)} ref={videoListRef}>
                {videoList.map((item, index) => (
                    <VideoCard
                        key={item.video_id}
                        scrollTop={scrollTop}
                        item={item}
                        isMute={isMute}
                        videoRef={videoRef}
                        isTouchDevice={isTouchDevice}
                        isActive={indexActive === index}
                        screenWidthMobile={screenWidthMobile}
                        handleSetMute={handleSetMute}
                    />
                ))}
            </div>
            {isLoading && !isLoadingFirst && isHasMore && (
                <LoadingHasMore customStyle={{ marginTop: '10px', paddingBottom: '10px' }} />
            )}
            {!isLoading && !isLoadingFirst && videoList.length === 0 && (
                <div className={clsx(styles.noResult)}>
                    <NoResult text="Không có video ngắn nào" />
                </div>
            )}
        </div>
    );
}

export default Shorts;
