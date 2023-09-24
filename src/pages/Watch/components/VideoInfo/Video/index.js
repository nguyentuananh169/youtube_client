import { GoMute } from 'react-icons/go';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import VideoPlay from '../../../../../components/VideoPlay';
import styles from './Video.module.css';
function Video({ videoId, videoLink }) {
    const videoRef = useRef(null);
    const userAgent = window.navigator.userAgent;
    const isIOS = userAgent.match(/iPhone|iPad|iPod/i);
    const [isMuteVolumeIOS, setIsMuteVolumeIOS] = useState(true);
    useEffect(() => {
        const videoEl = videoRef.current;
        const handleScroll = () => {
            videoEl.setAttribute('data-type', 'fixed');
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const handleChangeVolume = () => {
        setIsMuteVolumeIOS(false);
    };
    return (
        <div ref={videoRef} className={clsx(styles.video)}>
            {isMuteVolumeIOS && isIOS && (
                <button className={clsx(styles.mute)} onClick={handleChangeVolume}>
                    <GoMute size={17} />
                </button>
            )}
            <VideoPlay
                autoPlay
                muted={isMuteVolumeIOS && isIOS}
                handleChangeVolumePreview={handleChangeVolume}
                isAutoSkip
                videoId={videoId}
                videoLink={videoLink}
            />
        </div>
    );
}
export default Video;
