import {
    BsFillPauseFill,
    BsFillPlayFill,
    BsPlayCircle,
    BsVolumeMuteFill,
    BsFillVolumeUpFill,
} from 'react-icons/bs';
import { TiMediaPlayReverse, TiMediaPlay } from 'react-icons/ti';
import { RiDoubleQuotesR, RiClosedCaptioningLine } from 'react-icons/ri';
import { AiOutlineCheck } from 'react-icons/ai';
import { BiAbacus } from 'react-icons/bi';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Tooltip from '../Tooltip';
import TimeLine from './components/TimeLine';
import LeftControls from './components/LeftControls';
import RightControls from './components/RightControls';
import Spinner from '../Spinner';
import MobileControls from './components/MobileControls';
import NextVideo from './components/NextVideo';
import useStore from '../../hook/useStore';
import formatDuration from '../../hook/formatDuration';
import videoApi from '../../api/videoApi';
import styles from './VideoPlay.module.css';
function VideoPlay({
    videoId = '',
    videoLink = '',
    isPreview = false,
    isAutoSkip = false,
    maxSize = '',
    isMuteVoLumePreview,
    handleChangeVolumePreview,
    handleEndedVideo = () => {},
    ...attributes
}) {
    const menu = [
        {
            title: 'Chú thích',
            icon: <RiDoubleQuotesR />,
            value: 'Tắt',
            code: 'isNote',
            children: {
                title: 'Chú thích',
                code: 'isNote',
                data: [
                    { title: 'Tắt', value: false, icon: <AiOutlineCheck /> },
                    { title: 'Bật', value: true, icon: <AiOutlineCheck /> },
                ],
            },
        },
        {
            title: 'Tốc độ phát',
            icon: <BsPlayCircle />,
            value: 'Chuẩn',
            code: 'playSpeed',
            children: {
                title: 'Tốc độ phát',
                code: 'playSpeed',
                data: [
                    { title: '0.25', value: '0.25', icon: <AiOutlineCheck /> },
                    { title: '0.5', value: '0.5', icon: <AiOutlineCheck /> },
                    { title: '0.75', value: '0.75', icon: <AiOutlineCheck /> },
                    { title: 'Chuẩn', value: '1', icon: <AiOutlineCheck /> },
                    { title: '1.25', value: '1.25', icon: <AiOutlineCheck /> },
                    { title: '1.5', value: '1.5', icon: <AiOutlineCheck /> },
                    { title: '1.75', value: '1.75', icon: <AiOutlineCheck /> },
                    { title: '2', value: '2', icon: <AiOutlineCheck /> },
                ],
            },
        },
        {
            title: 'Phụ đề',
            icon: <RiClosedCaptioningLine />,
            value: 'Tắt',
            code: 'subtitle',
            children: {
                title: 'Phụ đề',
                code: 'subtitle',
                data: [
                    { title: 'Tắt', value: false, icon: <AiOutlineCheck /> },
                    { title: 'Bật', value: true, icon: <AiOutlineCheck /> },
                ],
            },
        },
        {
            title: 'Chất lượng',
            icon: <BiAbacus />,
            value: 'Tự động (720p)',
            code: 'quality',
            children: {
                title: 'Chất lượng',
                code: 'quality',
                data: [
                    { title: '1080p', value: '1080p', icon: <AiOutlineCheck /> },
                    { title: '720p', value: '720p', icon: <AiOutlineCheck /> },
                    { title: '480p', value: '480p', icon: <AiOutlineCheck /> },
                    { title: '360p', value: '360p', icon: <AiOutlineCheck /> },
                    { title: '240p', value: '240p', icon: <AiOutlineCheck /> },
                    { title: '144p', value: '144p', icon: <AiOutlineCheck /> },
                    { title: 'Tự động (720p)', value: 'Tự động (720p)', icon: <AiOutlineCheck /> },
                ],
            },
        },
    ];
    const data = {
        isPlay: true,
        isNote: false,
        isFullscreen: false,
        isVolume: true,
        volumeLevel: 'full',
        playSpeed: '1',
        subtitle: false,
        quality: 'Tự động (720p)',
    };
    const [loading, setLoading] = useState({ type: 'loading', isLoading: true });
    const [menuSetting, setMenuSetting] = useState(menu);
    const [dataSetting, setDataSetting] = useState(data);
    const [sizeVideo, setSizeVideo] = useState(maxSize);
    const [isNextVideo, setNextVideo] = useState(false);
    const [isUpdateView, setIsUpdateView] = useState(false);

    const wrapperRef = useRef(null);
    const timeLineRef = useRef(null);
    const videoRef = useRef(null);
    const atPlayVideoRef = useRef(null);
    const currentTimeRef = useRef(null);
    const totalTimeRef = useRef(null);
    const prevTimeRef = useRef(null);
    const nextTimeRef = useRef(null);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const timeoutRef = useRef(null);
    const timePlayRef = useRef(0);
    const intervalRef = useRef(0);

    const [state] = useStore();
    const { nextVideoInfo } = state;

    const isTouchDevice =
        'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    const userAgent = window.navigator.userAgent;
    const isIOS = userAgent.match(/iPhone|iPad|iPod/i);
    const isAndroid = userAgent.match(/Android/i);
    const handleSetVideoHeight = () => {
        const wrapperEl = wrapperRef.current;
        if (wrapperEl) {
            document.body.style.setProperty('--videoHeight', `${wrapperEl.clientHeight}px`);
        }
    };
    useEffect(() => {
        if (!dataSetting.isFullscreen) {
            const handleResize = () => {
                const width = window.innerWidth;
                if (width <= 992 && width > 768 && maxSize !== 'small') {
                    setSizeVideo('medium');
                } else if (width <= 768) {
                    setSizeVideo('small');
                } else if (!maxSize || maxSize === 'large') {
                    setSizeVideo('large');
                }
                handleSetVideoHeight();
            };
            handleResize();
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [maxSize, dataSetting.isFullscreen]);

    useEffect(() => {
        handleSetVideoHeight();
    }, []);
    useEffect(() => {
        if (!isPreview) {
            const handleKeyDown = (e) => {
                const nodeName = e.target.nodeName.toLowerCase();
                const key = e.key.toLowerCase();
                if (nodeName === 'input' || nodeName === 'textarea') {
                    return;
                }
                switch (key) {
                    case 'k':
                        handleClickVideo();
                        break;
                    case 'm':
                        handleClickVolume();
                        break;
                    case 'f':
                        handleClickFullscreen();
                        break;
                    case 'l':
                        handleNextTimeVideo();
                        break;
                    case 'j':
                        handlePrevTimeVideo();
                        break;
                    case 'c':
                        handleChangeDataSetting(
                            'subtitle',
                            !dataSetting.subtitle,
                            dataSetting.subtitle ? 'Tắt' : 'Bật',
                        );
                        break;
                    default:
                        break;
                }
            };

            document.addEventListener('keydown', handleKeyDown);
            return () => {
                document.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [dataSetting.subtitle]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            if (
                !(
                    document.fullscreenElement ||
                    document.mozFullScreenElement ||
                    document.webkitFullscreenElement ||
                    document.msFullscreenElement ||
                    document.webkitEnterFullscreen
                )
            ) {
                setDataSetting({ ...dataSetting, isFullscreen: false });
            }
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);
    useEffect(() => {
        if (dataSetting.isFullscreen && isAndroid) {
            // Kiểm tra xem trình duyệt hỗ trợ chế độ quay ngang không
            if (window.screen.orientation) {
                // Kiểm tra xem màn hình hiện tại đã ở chế độ ngang chưa
                if (window.screen.orientation.type !== 'landscape-primary') {
                    // Chuyển sang chế độ ngang
                    window.screen.orientation
                        .lock('landscape-primary')
                        .then(function () {
                            // Xử lý khi đã chuyển sang chế độ ngang thành công
                            console.log('Màn hình đã chuyển sang chế độ ngang.');
                        })
                        .catch(function (error) {
                            // Xử lý khi có lỗi xảy ra
                            console.error('Lỗi khi chuyển chế độ ngang:', error);
                        });
                }
            } else {
                console.log('Trình duyệt không hỗ trợ chế độ quay ngang.');
            }
        }
    }, [dataSetting.isFullscreen]);
    useEffect(() => {
        const videoEl = videoRef.current;
        if (videoEl) {
            const handleSetIsPlayVideo = () => {
                const duration = Math.floor(videoEl.duration) / 2;
                if (videoEl.paused) {
                    setDataSetting((state) => ({ ...state, isPlay: false }));
                    clearInterval(intervalRef.current);
                } else {
                    if (!isUpdateView && videoId) {
                        intervalRef.current = setInterval(() => {
                            timePlayRef.current += 1;
                            if (timePlayRef.current >= duration) {
                                setIsUpdateView(true);
                            }
                        }, 1000);
                    }
                    setDataSetting((state) => ({ ...state, isPlay: true }));
                }
            };
            handleSetIsPlayVideo();
            videoEl.addEventListener('play', handleSetIsPlayVideo);
            videoEl.addEventListener('pause', handleSetIsPlayVideo);
            videoEl.addEventListener('ended', handleEndedVideo);
            return () => {
                clearInterval(intervalRef.current);
                videoEl.removeEventListener('play', handleSetIsPlayVideo);
                videoEl.removeEventListener('pause', handleSetIsPlayVideo);
                videoEl.removeEventListener('ended', handleEndedVideo);
            };
        }
    }, [isUpdateView]);
    useEffect(() => {
        if (isUpdateView && videoId) {
            clearInterval(intervalRef.current);
            const handleUpdateView = async () => {
                const params = new FormData();
                params.append('_video_id', videoId);
                const response = await videoApi.updateView(params);
            };
            handleUpdateView();
        }
    }, [isUpdateView]);
    const handlePlayVideo = () => {
        videoRef.current.play();
    };
    const handlePauseVideo = () => {
        videoRef.current.pause();
    };
    const handleClickVideo = () => {
        atPlayVideoRef.current.classList.add(clsx(styles.show));
        if (timeoutRef.current) {
            clearTimeout(timeoutRef);
        }
        timeoutRef.current = setTimeout(() => {
            atPlayVideoRef.current.classList.remove(clsx(styles.show));
        }, 500);

        if (videoRef.current.paused) {
            handlePlayVideo();
        } else {
            handlePauseVideo();
        }
    };

    const handleLoadMeatdata = () => {
        currentTimeRef.current.innerText = formatDuration(videoRef.current.currentTime);
        totalTimeRef.current.innerText = formatDuration(videoRef.current.duration);
        const wrapperEl = wrapperRef.current;
        document.body.style.setProperty('--videoHeight', `${wrapperEl.clientHeight}px`);
    };
    const handleTimeUpdate = () => {
        if (isNextVideo) {
            setNextVideo(false);
        }
        if (videoRef.current.currentTime === videoRef.current.duration) {
            setDataSetting({ ...dataSetting, isPlay: false });
        }
        const timeLine = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        wrapperRef.current.style.setProperty('--widthTimeLineVideo2', `${timeLine.toFixed(3)}%`);
        currentTimeRef.current.innerText = formatDuration(videoRef.current.currentTime);
        totalTimeRef.current.innerText = formatDuration(videoRef.current.duration);
    };

    const handlePrevTimeVideo = () => {
        videoRef.current.currentTime -= 10;
        if (prevRef.current) {
            clearTimeout(prevRef.current);
        }
        prevTimeRef.current.classList.add(clsx(styles.show));
        prevRef.current = setTimeout(() => {
            prevTimeRef.current.classList.remove(clsx(styles.show));
        }, 600);
    };
    const handleNextTimeVideo = () => {
        if (videoRef.current.currentTime >= videoRef.current.duration) {
            return;
        }
        videoRef.current.currentTime += 10;
        if (nextRef.current) {
            clearTimeout(nextRef.current);
        }
        nextTimeRef.current.classList.add(clsx(styles.show));
        nextRef.current = setTimeout(() => {
            nextTimeRef.current.classList.remove(clsx(styles.show));
        }, 600);
    };
    const getTimeLinePercent = (e) => {
        const clientX = e.clientX || e.touches[0].clientX;
        const timeLineEl = timeLineRef.current;
        const left = timeLineEl.getBoundingClientRect().left;
        const width = timeLineEl.getBoundingClientRect().width;
        let percent = Math.round(((clientX - left) / width) * 100);

        if (percent < 0) {
            percent = 0;
        }
        if (percent > 100) {
            percent = 100;
        }
        return percent;
    };
    const handleMouseMoveTimeLine = (e) => {
        const percent = getTimeLinePercent(e);
        wrapperRef.current.style.setProperty('--widthTimeLineVideo1', `${percent}%`);
    };
    const handleMouseOutTimeLine = () => {
        wrapperRef.current.style.setProperty('--widthTimeLineVideo1', `0`);
    };
    const handleClickTimeLine = (e) => {
        const percent = getTimeLinePercent(e);
        wrapperRef.current.style.setProperty('--widthTimeLineVideo2', `${percent}%`);
        videoRef.current.currentTime = (videoRef.current.duration * percent) / 100;
    };
    const handleChangeVolume = (value) => {
        videoRef.current.volume = value / 10;
        if (value === '0') {
            setDataSetting({ ...dataSetting, isVolume: false, volumeLevel: 'mute' });
        } else if (value > 0 && value <= 5) {
            setDataSetting({ ...dataSetting, isVolume: true, volumeLevel: 'low' });
        } else {
            setDataSetting({ ...dataSetting, isVolume: true, volumeLevel: 'full' });
        }
    };
    const handleSetLoading = (type, isLoading) => {
        setLoading({ type, isLoading });
    };

    const handleClickVolume = () => {
        if (videoRef.current.volume) {
            videoRef.current.volume = 0;
            setDataSetting({ ...dataSetting, isVolume: false, volumeLevel: 'mute' });
        } else {
            videoRef.current.volume = 1;
            setDataSetting({ ...dataSetting, isVolume: true, volumeLevel: 'full' });
        }
    };
    const handleChangeSpeed = (value) => {
        videoRef.current.playbackRate = value;
    };
    const handleChangeDataSetting = (key, value, title) => {
        switch (key) {
            case 'playSpeed':
                handleChangeSpeed(value);
                break;
            default:
                break;
        }
        const index = menuSetting.findIndex((item) => item.code === key);
        if (index !== -1) {
            const menu = menuSetting;
            menu[index].value = title;
            setMenuSetting(menu);
        }
        setDataSetting({ ...dataSetting, [key]: value });
    };
    const handleOpenFullscreen = () => {
        const element = isTouchDevice && isIOS ? videoRef.current : wrapperRef.current;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.webkitEnterFullscreen) {
            element.webkitEnterFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
        setDataSetting({ ...dataSetting, isFullscreen: true });
    };
    const handleExitFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.webkitEndFullscreen) {
            document.webkitEndFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        setDataSetting({ ...dataSetting, isFullscreen: false });
    };
    const handleClickFullscreen = () => {
        if (
            !(
                document.fullscreenElement ||
                document.mozFullScreenElement ||
                document.webkitFullscreenElement ||
                document.webkitEnterFullscreen ||
                document.msFullscreenElement
            )
        ) {
            handleOpenFullscreen();
        } else {
            handleExitFullscreen();
        }
    };
    const handleNextVideo = (boolean = true) => {
        if (
            document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement ||
            document.webkitEnterFullscreen ||
            document.msFullscreenElement
        ) {
            handleExitFullscreen();
        }
        if (document.pictureInPictureElement) {
            document.exitPictureInPicture();
        }
        handlePauseVideo();
        setIsUpdateView(false);
        timePlayRef.current = 0;
        setNextVideo(boolean);
    };
    const handlePictureInPicture = () => {
        const videoEl = videoRef.current;
        if (document.pictureInPictureElement) {
            document.exitPictureInPicture();
        } else {
            videoEl.requestPictureInPicture();
        }
    };
    useEffect(() => {
        const videoEl = videoRef.current;
        return () => {
            if (document.pictureInPictureElement) {
                videoEl.pause();
                document.exitPictureInPicture();
            }
        };
    }, []);
    return (
        <div
            ref={wrapperRef}
            className={clsx(styles.wrapper, {
                [styles.preview]: isPreview,
                [styles[sizeVideo]]: sizeVideo,
                [styles.pauseVideo]: !dataSetting.isPlay || isPreview,
                [styles.fullscreen]: dataSetting.isFullscreen,
            })}
        >
            <div className={clsx(styles.aspectRatio)}>
                {isNextVideo && isAutoSkip && nextVideoInfo?.id && (
                    <>
                        <div className={clsx(styles.overlay)}></div>
                        <div className={clsx(styles.nextVideo)}>
                            <NextVideo
                                size={sizeVideo}
                                handleNextVideo={handleNextVideo}
                                videoInfo={nextVideoInfo}
                            />
                        </div>
                    </>
                )}
                {isPreview && (
                    <div className={clsx(styles.volume)} onClick={handleChangeVolumePreview}>
                        <Tooltip
                            content={isMuteVoLumePreview ? 'Tắt tiếng (m)' : 'Mở tiếng (m)'}
                            customStyle={{
                                right: '0',
                                top: 'calc(100% + 5px)',
                                whiteSpace: 'nowrap',
                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            }}
                        />
                        {isMuteVoLumePreview ? (
                            <BsVolumeMuteFill size={17} color="#fff" />
                        ) : (
                            <BsFillVolumeUpFill size={17} color="#fff" />
                        )}
                    </div>
                )}

                {loading.isLoading && (
                    <Spinner
                        customStyle={
                            loading.type === 'loading' && { backgroundColor: 'rgba(0, 0, 0, 1)' }
                        }
                    />
                )}

                <div ref={atPlayVideoRef} className={clsx(styles.animation, styles.atPlayVideo)}>
                    {dataSetting.isPlay ? (
                        <BsFillPauseFill color="#fff" />
                    ) : (
                        <BsFillPlayFill color="#fff" />
                    )}
                </div>
                <div ref={prevTimeRef} className={clsx(styles.animation, styles.prevTime)}>
                    <div className={clsx(styles.icons)}>
                        <TiMediaPlayReverse />
                        <TiMediaPlayReverse />
                        <TiMediaPlayReverse />
                    </div>
                    <span>10 giây</span>
                </div>
                <div ref={nextTimeRef} className={clsx(styles.animation, styles.nextTime)}>
                    <div className={clsx(styles.icons)}>
                        <TiMediaPlay />
                        <TiMediaPlay />
                        <TiMediaPlay />
                    </div>
                    <span>10 giây</span>
                </div>
                {(!isNextVideo || !nextVideoInfo?.id) && !isPreview && sizeVideo === 'small' && (
                    <MobileControls
                        menuSetting={menuSetting}
                        dataSetting={dataSetting}
                        handleClickVideo={handleClickVideo}
                        handleChangeDataSetting={handleChangeDataSetting}
                        handleNextTimeVideo={handleNextTimeVideo}
                        handlePrevTimeVideo={handlePrevTimeVideo}
                    />
                )}

                <div
                    className={clsx(styles.controls, {
                        [styles.hidden]: isNextVideo && nextVideoInfo?.id && sizeVideo === 'small',
                    })}
                >
                    <TimeLine
                        isTouchDevice={isTouchDevice}
                        isPreview={isPreview}
                        size={sizeVideo}
                        timeLineRef={timeLineRef}
                        handlePauseVideo={handlePauseVideo}
                        handlePlayVideo={handlePlayVideo}
                        handleMouseMoveTimeLine={handleMouseMoveTimeLine}
                        handleMouseOutTimeLine={handleMouseOutTimeLine}
                        handleClickTimeLine={handleClickTimeLine}
                    />
                    <div className={clsx(styles.actions)}>
                        <LeftControls
                            isAutoSkip={isAutoSkip}
                            isPreview={isPreview}
                            size={sizeVideo}
                            dataSetting={dataSetting}
                            currentTimeRef={currentTimeRef}
                            totalTimeRef={totalTimeRef}
                            nextVideoInfo={nextVideoInfo}
                            handleClickVideo={handleClickVideo}
                            handleClickVolume={handleClickVolume}
                            handleChangeVolume={handleChangeVolume}
                        />
                        <RightControls
                            isPreview={isPreview}
                            size={sizeVideo}
                            videoEl={videoRef.current}
                            menuSetting={menuSetting}
                            dataSetting={dataSetting}
                            handleChangeDataSetting={handleChangeDataSetting}
                            handleClickFullscreen={handleClickFullscreen}
                            handlePictureInPicture={handlePictureInPicture}
                        />
                    </div>
                </div>

                <video
                    className={clsx(styles.video)}
                    ref={videoRef}
                    onClick={() => {
                        sizeVideo !== 'small' && handleClickVideo();
                    }}
                    onLoadedMetadata={handleLoadMeatdata}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedData={() => handleSetLoading('loading', false)}
                    onWaiting={() => handleSetLoading('waiting', true)}
                    onPlaying={() => handleSetLoading('playing', false)}
                    onEnded={handleNextVideo}
                    controls={false}
                    webkit-playsinline="true"
                    playsInline={true}
                    {...attributes}
                >
                    <source src={videoLink} type="video/mp4"></source>
                </video>
            </div>
        </div>
    );
}

export default VideoPlay;
