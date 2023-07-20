import { useEffect, useRef, version } from 'react';
import clsx from 'clsx';
import VideoPlay from '../../components/VideoPlay';
import Comments from './components/Comments';
import Metadata from './components/Metadata';
import VideoList from './components/VideoList';
import styles from './Watch.module.css';
function Watch() {
    const wrapperRef = useRef(null);
    const videoRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            const videoEl = videoRef.current;
            if (window.innerWidth <= 768) {
                document.body.style.setProperty('--videoHeight', `${videoEl.clientHeight}px`);
            } else {
                document.body.style.overflow = '';
                document.body.style.backgroundColor = '';
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    useEffect(() => {
        const wrapperEl = wrapperRef.current;
        const handleScroll = () => {
            wrapperEl.setAttribute('data-type', 'fixed');
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div ref={wrapperRef} className={clsx(styles.wrapper)}>
            <div className={clsx(styles.main)}>
                <div ref={videoRef} className={clsx(styles.video)}>
                    <VideoPlay autoPlay isAutoSkip />
                </div>
                <div className={clsx(styles.metadata)}>
                    <Metadata />
                </div>
                <div className={clsx(styles.comments)}>
                    <Comments />
                </div>
            </div>
            <div className={clsx(styles.videoList)}>
                <VideoList />
            </div>
        </div>
    );
}

export default Watch;
