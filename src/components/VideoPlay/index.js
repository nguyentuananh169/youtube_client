import { BsFillPauseFill, BsFillPlayFill, BsPlayCircle } from 'react-icons/bs';
import { TiMediaPlayReverse, TiMediaPlay } from 'react-icons/ti';
import { RiDoubleQuotesR } from 'react-icons/ri';
import { AiOutlineCheck } from 'react-icons/ai';
import { BiAbacus } from 'react-icons/bi';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import TimeLine from './components/TimeLine';
import LeftControls from './components/LeftControls';
import RightControls from './components/RightControls';
import styles from './VideoPlay.module.css';
function VideoPlay({ controls }) {
    const data = [
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
    const [dataSetting, setDataSetting] = useState(data);
    const [isPlay, setPlay] = useState(false);
    const [volumeLevel, setVolumeLevel] = useState('full');
    const [isVolume, setVolume] = useState(true);
    const [isFullscreen, setFullscreen] = useState(false);
    const [playSpeed, setPlaySpeed] = useState(1);

    const wrapperRef = useRef(null);
    const videoRef = useRef(null);
    const atPlayVideoRef = useRef(null);
    const timeoutRef = useRef(null);
    const currentTimeRef = useRef(null);
    const totalTimeRef = useRef(null);
    const prevTimeRef = useRef(null);
    const nextTimeRef = useRef(null);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    console.log('render');
    console.log(dataSetting);
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (
                e.target.nodeName.toLowerCase() === 'input' ||
                e.target.nodeName.toLowerCase() === 'textarea'
            )
                return;
            switch (e.key.toLowerCase()) {
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
                default:
                    break;
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
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

    const handlePlayVideo = () => {
        videoRef.current.play();
        setPlay(true);
    };
    const handlePauseVideo = () => {
        videoRef.current.pause();
        setPlay(false);
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
    };

    const handleTimeUpdate = () => {
        if (videoRef.current.currentTime === videoRef.current.duration) {
            setPlay(false);
        }
        currentTimeRef.current.innerText = formatDuration(videoRef.current.currentTime);
        totalTimeRef.current.innerText = formatDuration(videoRef.current.duration);

        const timeLine = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        document.documentElement.style.setProperty(
            '--widthTimeLineVideo2',
            `${timeLine.toFixed(3)}%`,
        );
        currentTimeRef.current.innerText = formatDuration(videoRef.current.currentTime);
        totalTimeRef.current.innerText = formatDuration(videoRef.current.duration);
    };

    const handleChangeVolume = (value) => {
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
            videoRef.current.volume = 0;
            setVolume(false);
            setVolumeLevel('mute');
        } else {
            videoRef.current.volume = 1;
            setVolume(true);
            setVolumeLevel('full');
        }
    };

    const handleClickFullscreen = () => {
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
        const clientX = e.clientX;
        const left = e.target.getBoundingClientRect().left;
        const width = e.target.getBoundingClientRect().width;
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
        document.documentElement.style.setProperty('--widthTimeLineVideo1', `${percent}%`);
    };
    const handleMouseOutTimeLine = () => {
        document.documentElement.style.setProperty('--widthTimeLineVideo1', 0);
    };
    const handleClickTimeLine = (e) => {
        const percent = getTimeLinePercent(e);
        document.documentElement.style.setProperty('--widthTimeLineVideo2', `${percent}%`);
        videoRef.current.currentTime = (videoRef.current.duration * percent) / 100;
    };
    const handleChangeSpeed = (value, title) => {
        videoRef.current.playbackRate = value;
        setPlaySpeed(value);
        let data = dataSetting;
        data[1].value = title;
        setDataSetting(data);
    };
    return (
        <div ref={wrapperRef} className={clsx(styles.wrapper)}>
            <div ref={atPlayVideoRef} className={clsx(styles.animation, styles.atPlayVideo)}>
                {isPlay ? <BsFillPlayFill color="#fff" /> : <BsFillPauseFill color="#fff" />}
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
            <div className={clsx(styles.controls)}>
                <TimeLine
                    handleMouseMoveTimeLine={handleMouseMoveTimeLine}
                    handleMouseOutTimeLine={handleMouseOutTimeLine}
                    handleClickTimeLine={handleClickTimeLine}
                />
                <div className={clsx(styles.actions)}>
                    <LeftControls
                        isPlay={isPlay}
                        isVolume={isVolume}
                        volumeLevel={volumeLevel}
                        handleClickVideo={handleClickVideo}
                        handleClickVolume={handleClickVolume}
                        handleChangeVolume={handleChangeVolume}
                    >
                        <span ref={currentTimeRef}>0:0</span>
                        <span> / </span>
                        <span ref={totalTimeRef}>0:0</span>
                    </LeftControls>
                    <RightControls
                        dataSetting={dataSetting}
                        isFullscreen={isFullscreen}
                        playSpeed={playSpeed}
                        handleChangeSpeed={handleChangeSpeed}
                        handleClickFullscreen={handleClickFullscreen}
                    />
                </div>
            </div>
            <video
                className={clsx(styles.video)}
                ref={videoRef}
                onClick={handleClickVideo}
                onLoadedMetadata={handleLoadMeatdata}
                onTimeUpdate={handleTimeUpdate}
            >
                <source
                    src="https://res.cloudinary.com/dkg7pdt03/video/upload/v1671353025/video2_nsn5s9.mp4"
                    type="video/mp4"
                    controls
                ></source>
            </video>
        </div>
    );
}

export default VideoPlay;
