import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './VideoCard.module.css';
import videoApi from '../../../api/videoApi';
function VideoPlay({ videoId, videoLink, isMute, videoRef }) {
    const timeLineRef = useRef(null);
    const animationRef = useRef(null);
    const intervalRef = useRef(null);
    const timePlayRef = useRef(0);
    const [isPlay, setIsPlay] = useState(true);
    const [isLoading, setLoading] = useState(true);
    const [isUpdateView, setIsUpdateView] = useState(false);
    const handlePlayVideo = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlay(true);
        }
    };
    const handlePauseVideo = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            setIsPlay(false);
        }
    };
    const handleClickVideo = () => {
        if (videoRef.current.paused) {
            handlePlayVideo();
        } else {
            handlePauseVideo();
        }
        animationRef.current.classList.add(clsx(styles.show));
        setTimeout(() => {
            animationRef.current.classList.remove(clsx(styles.show));
        }, 600);
    };
    const handleTimeUpdate = () => {
        const videoEl = videoRef.current;
        const timeLine = (videoEl.currentTime / videoEl.duration) * 100;
        timeLineRef.current.style.setProperty('--widthTimeLineVideo', `${timeLine.toFixed(3)}%`);
        if (timeLine === 0) {
            setIsUpdateView(false);
            timePlayRef.current = 0;
        }
    };
    useEffect(() => {
        if (isUpdateView && videoId && videoRef.current) {
            clearInterval(intervalRef.current);
            const handleUpdateView = async () => {
                const params = new FormData();
                params.append('_video_id', videoId);
                const response = await videoApi.updateView(params);
            };
            handleUpdateView();
        }
    }, [isUpdateView]);

    useEffect(() => {
        if (videoRef.current && !isUpdateView) {
            const videoEl = videoRef.current;
            const handlePlaying = () => {
                if (!isUpdateView && videoId) {
                    const duration = Math.floor(videoEl.duration) / 2;
                    if (videoEl.paused || isLoading) {
                        clearInterval(intervalRef.current);
                    } else {
                        intervalRef.current = setInterval(() => {
                            timePlayRef.current += 1;
                            if (timePlayRef.current >= duration) {
                                setIsUpdateView(true);
                            }
                        }, 1000);
                    }
                }
            };

            handlePlaying();
            videoEl.addEventListener('play', handlePlaying);
            videoEl.addEventListener('pause', handlePlaying);

            return () => {
                clearInterval(intervalRef.current);
                videoEl.removeEventListener('play', handlePlaying);
                videoEl.removeEventListener('pause', handlePlaying);
            };
        }
    }, [isUpdateView, isLoading]);
    return (
        <>
            {isLoading && (
                <div className={clsx(styles.loading)}>
                    <div className={clsx(styles.spiner)}></div>
                </div>
            )}
            <div className={clsx(styles.playVideo)} onClick={handleClickVideo}>
                {isPlay ? <BsFillPauseFill size={20} /> : <BsFillPlayFill size={20} />}
            </div>

            <div ref={animationRef} className={clsx(styles.animation)}>
                {isPlay ? <BsFillPlayFill /> : <BsFillPauseFill />}
            </div>

            <video
                ref={videoRef}
                className={clsx(styles.video)}
                onClick={handleClickVideo}
                onTimeUpdate={handleTimeUpdate}
                onLoadedData={() => setLoading(false)}
                onWaiting={() => setLoading(true)}
                onPlaying={() => setLoading(false)}
                src={videoLink}
                controls={false}
                loop={true}
                autoPlay={true}
                muted={isMute}
            ></video>
            <div className={clsx(styles.timeLine)} ref={timeLineRef}></div>
        </>
    );
}

export default VideoPlay;
