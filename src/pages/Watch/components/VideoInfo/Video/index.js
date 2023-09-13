import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import VideoPlay from '../../../../../components/VideoPlay';
import styles from './Video.module.css';
function Video({ videoId, videoLink }) {
    const videoRef = useRef(null);
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
    return (
        <div ref={videoRef} className={clsx(styles.video)}>
            <VideoPlay autoPlay isAutoSkip videoId={videoId} videoLink={videoLink} />
        </div>
    );
}
export default Video;
