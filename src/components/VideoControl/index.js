import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import {
    BsFillPlayFill,
    BsFillPauseFill,
    BsFillVolumeUpFill,
    BsVolumeDownFill,
    BsVolumeMuteFill,
    BsFillSkipEndFill,
    BsPlayCircle,
} from 'react-icons/bs';
import { RiClosedCaptioningLine } from 'react-icons/ri';
import { MdSettings } from 'react-icons/md';
import { CgToggleSquareOff, CgToggleSquare } from 'react-icons/cg';
import { FaChromecast } from 'react-icons/fa';
import { BiFullscreen, BiExitFullscreen, BiAbacus } from 'react-icons/bi';
import { RiDoubleQuotesR } from 'react-icons/ri';
import { AiOutlineCheck } from 'react-icons/ai';

import styles from './VideoControl.module.css';
import MenuSetting from './component/MenuSetting';
function VideoControl({ controls }) {
    const [isPlay, setPlay] = useState(false);
    const [volumeLevel, setVolumeLevel] = useState('full');
    const [isVolume, setVolume] = useState(true);
    const [playSpeed, setPlaySpeed] = useState(1);
    const [isFullscreen, setFullscreen] = useState(false);
    const [activeSetting, setActiveSetting] = useState(false);

    const wrapperRef = useRef(null);
    const videoRef = useRef(null);
    const timeLineRef = useRef(null);
    const volumeRef = useRef(null);
    const currentTimeRef = useRef(null);
    const totalTimeRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (
                e.target.nodeName.toLowerCase() === 'input' ||
                e.target.nodeName.toLowerCase() === 'textarea'
            )
                return;
            switch (e.key.toLowerCase()) {
                case 'k':
                    handlePlayVideo();
                    break;
                case 'm':
                    handleClickVolume();
                    break;
                case 'f':
                    handleFullscreen();
                    break;
                case 'l':
                    videoRef.current.currentTime += 10;
                    break;
                case 'j':
                    videoRef.current.currentTime -= 10;
                    break;
                default:
                    break;
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    useEffect(() => {
        timeLineRef.current.addEventListener('mousedown', () => {
            document.body.style.userSelect = 'none';
            document.addEventListener('mousemove', handleClickTimeLine);
        });
        document.addEventListener('mouseup', () => {
            document.body.style.userSelect = 'auto';
            document.removeEventListener('mousemove', handleClickTimeLine);
        });
        return () => {
            document.removeEventListener('mouseup', () => {
                document.body.style.userSelect = 'auto';
                document.removeEventListener('mousemove', handleClickTimeLine);
            });
        };
    }, []);
    const formatNumber = (number) => {
        if (number > 0 && number < 10) {
            return `0${number}`;
        } else {
            return number;
        }
    };
    const formatDuration = (time) => {
        let seconds = Math.floor(time % 60);
        let minutes = Math.floor(time / 60) % 60;
        let hours = Math.floor(time / 3600);
        if (hours > 0) {
            return `${hours}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
        } else {
            return `${minutes}:${formatNumber(seconds)}`;
        }
    };
    const hanleLoadedMetadata = () => {
        currentTimeRef.current.innerText = formatDuration(videoRef.current.currentTime);
        totalTimeRef.current.innerText = formatDuration(videoRef.current.duration || 0);
    };
    const getTimeLinePercent = (e) => {
        const clientX = e.clientX;
        const left = timeLineRef.current.getBoundingClientRect().left;
        const width = timeLineRef.current.getBoundingClientRect().width;
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
        timeLineRef.current.style.setProperty('--width1', `${percent}%`);
    };
    const handleMouseOutTimeLine = (e) => {
        const element = e.target;
        element.style.setProperty('--width1', 0);
    };
    const handleClickTimeLine = (e) => {
        const percent = getTimeLinePercent(e);
        timeLineRef.current.style.setProperty('--width2', `${percent}%`);
        videoRef.current.currentTime = (videoRef.current.duration * percent) / 100;
    };
    const handlePlayVideo = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setPlay(true);
        } else {
            videoRef.current.pause();
            setPlay(false);
        }
    };
    const handleTimeUpdate = () => {
        if (videoRef.current.currentTime === videoRef.current.duration) {
            setPlay(false);
        }
        const timeLine = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        timeLineRef.current.style.setProperty('--width2', `${timeLine.toFixed(3)}%`);
        currentTimeRef.current.innerText = formatDuration(videoRef.current.currentTime);
        totalTimeRef.current.innerText = formatDuration(videoRef.current.duration);
    };
    const handleChaneVolume = (value) => {
        videoRef.current.volume = value / 10;
        if (value === '0') {
            setVolume(false);
            setVolumeLevel('mute');
        } else if (value > 0 && value <= 5) {
            setVolume(true);
            setVolumeLevel('low');
        } else {
            setVolume(true);
            setVolumeLevel('full');
        }
    };
    const handleClickVolume = () => {
        if (videoRef.current.volume) {
            volumeRef.current.value = 0;
            setVolumeLevel('full');
            videoRef.current.volume = 0;
            setVolume(false);
            setVolumeLevel('mute');
        } else {
            volumeRef.current.value = 10;
            setVolumeLevel('full');
            videoRef.current.volume = 1;
            setVolume(true);
            setVolumeLevel('full');
        }
    };
    const handleFullscreen = () => {
        if (
            !(
                document.fullscreenElement ||
                document.mozFullScreenElement ||
                document.webkitFullscreenElement ||
                document.msFullscreenElement
            )
        ) {
            wrapperRef.current.requestFullscreen();
            setFullscreen(true);
        } else {
            setFullscreen(false);
            document.exitFullscreen();
        }
    };
    // handle setting
    const dataSetting = [
        {
            title: 'Chú thích',
            icon: <RiDoubleQuotesR />,
            value: '',
            code: 'note',
        },
        {
            title: 'Tốc độ phát',
            icon: <BsPlayCircle />,
            value: 'chuẩn',
            children: {
                title: 'Tốc độ phát',
                code: 'speed',
                data: [
                    { title: '0.25', value: 0.25, icon: <AiOutlineCheck /> },
                    { title: '0.5', value: 0.5, icon: <AiOutlineCheck /> },
                    { title: '0.75', value: 0.75, icon: <AiOutlineCheck /> },
                    { title: 'chuẩn', value: 1, icon: <AiOutlineCheck /> },
                    { title: '1.25', value: 1.25, icon: <AiOutlineCheck /> },
                    { title: '1.5', value: 1.5, icon: <AiOutlineCheck /> },
                    { title: '1.75', value: 1.75, icon: <AiOutlineCheck /> },
                    { title: '2', value: 2, icon: <AiOutlineCheck /> },
                ],
            },
        },
        {
            title: 'Chất lượng',
            icon: <BiAbacus />,
            value: 'Tự động (480p)',
            children: {
                title: 'Chất lượng',
                code: 'quality',
                data: [
                    { title: '1080p', value: '1080p' },
                    { title: '720p', value: '720p' },
                    { title: '480p', value: '480p' },
                    { title: '360p', value: '360p' },
                    { title: '240p', value: '240p' },
                    { title: '144p', value: '144p' },
                    { title: 'Tự động', value: 'Tự động' },
                ],
            },
        },
    ];
    const handleToggleActveSetting = () => {
        setActiveSetting(!activeSetting);
    };
    const handleChangeSpeed = (speed, name) => {
        videoRef.current.playbackRate = speed;
        setPlaySpeed(speed);
    };
    return (
        <div className={clsx(styles.wrapper)} ref={wrapperRef}>
            <div className={clsx(styles.videoControls, { [styles.active]: !isPlay })}>
                <div className={clsx(styles.timeLineContainer)}>
                    <div
                        ref={timeLineRef}
                        onMouseMove={handleMouseMoveTimeLine}
                        onMouseOut={handleMouseOutTimeLine}
                        onClick={handleClickTimeLine}
                        className={clsx(styles.timeLine, { [styles.delay]: isPlay })}
                    >
                        <div className={clsx(styles.indicator)}></div>
                    </div>
                </div>
                {controls && (
                    <div className={clsx(styles.controls)}>
                        <div className={clsx(styles.controlsLeft)}>
                            <div
                                className={clsx(styles.btn, styles.play)}
                                onClick={handlePlayVideo}
                            >
                                <div className={clsx(styles.tooltip)}>{`Phát (k)`}</div>
                                {isPlay ? <BsFillPauseFill /> : <BsFillPlayFill />}
                            </div>
                            <div className={clsx(styles.btn, styles.skip)}>
                                <BsFillSkipEndFill />
                            </div>
                            <div className={clsx(styles.volumeContainer)}>
                                <div
                                    className={clsx(styles.btn, styles.volume)}
                                    onClick={handleClickVolume}
                                >
                                    <div className={clsx(styles.tooltip)} style={{ left: '-40%' }}>
                                        {isVolume ? 'Tắt tiếng (m)' : 'Mở tiếng (m)'}
                                    </div>
                                    {volumeLevel === 'mute' && <BsVolumeMuteFill />}
                                    {volumeLevel === 'low' && <BsVolumeDownFill />}
                                    {volumeLevel === 'full' && <BsFillVolumeUpFill />}
                                </div>
                                <div className={clsx(styles.volumeLine)}>
                                    <input
                                        ref={volumeRef}
                                        type="range"
                                        min={0}
                                        max="10"
                                        step={1}
                                        onChange={(e) => handleChaneVolume(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className={clsx(styles.volumeLine)}></div>
                            <div className={clsx(styles.text)}>
                                <span ref={currentTimeRef}>0:0</span>
                                <span> / </span>
                                <span ref={totalTimeRef}>0:0</span>
                            </div>
                            <div className={clsx(styles.title)}>
                                <span style={{ marginRight: '10px', display: 'inline-block' }}>
                                    •
                                </span>
                                <span>How To Create The YouTube Video Player</span>
                            </div>
                        </div>
                        <div className={clsx(styles.controlsRight)}>
                            <div className={clsx(styles.btn, styles.caption)}>
                                <div className={clsx(styles.tooltip)} style={{ right: '-15%' }}>
                                    {'Phụ đề (c)'}
                                </div>
                                <RiClosedCaptioningLine />
                            </div>
                            <div
                                className={clsx(styles.btn, styles.setting, {
                                    [styles.active]: activeSetting,
                                })}
                                onClick={handleToggleActveSetting}
                            >
                                <div
                                    className={clsx(styles.tooltip)}
                                    style={{ right: '-8%' }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                >
                                    <MenuSetting
                                        isActiveSetting={activeSetting}
                                        items={dataSetting}
                                        playSpeed={playSpeed}
                                        handleChangeSpeed={handleChangeSpeed}
                                    />
                                </div>
                                <MdSettings />
                            </div>
                            <div className={clsx(styles.btn, styles.movie)}>
                                <div className={clsx(styles.tooltip)} style={{ right: '-118%' }}>
                                    {'Trình phát thu nhỏ (i)'}
                                </div>
                                <CgToggleSquareOff />
                            </div>
                            <div className={clsx(styles.btn, styles.rectangle)}>
                                <div className={clsx(styles.tooltip)} style={{ right: '-118%' }}>
                                    {'Chế độ rạp chiếu phim (t)'}
                                </div>
                                <CgToggleSquare />
                            </div>
                            <div className={clsx(styles.btn, styles.tv)}>
                                <FaChromecast />
                            </div>
                            <div
                                className={clsx(styles.btn, styles.fullscreen)}
                                onClick={handleFullscreen}
                            >
                                <div className={clsx(styles.tooltip)}>
                                    {isFullscreen
                                        ? 'Thát khỏi chế độ toàn màn hình (f)'
                                        : 'Toàn màn hình (f)'}
                                </div>
                                {isFullscreen ? <BiExitFullscreen /> : <BiFullscreen />}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <video
                onClick={handlePlayVideo}
                className={clsx(styles.video)}
                ref={videoRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={hanleLoadedMetadata}
            >
                <source
                    src="https://res.cloudinary.com/dkg7pdt03/video/upload/v1671352493/dem-nguoc-30s_cynrln.mp4"
                    type="video/mp4"
                    controls
                ></source>
            </video>
        </div>
    );
}

export default VideoControl;
