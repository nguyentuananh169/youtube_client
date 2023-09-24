import { MdArrowBackIosNew, MdOutlineArrowForwardIos, MdOutlineClose } from 'react-icons/md';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import VideoPlay from '../../../components/VideoPlay';
import styles from './Modal.module.css';
import { useRef } from 'react';
function Modal({
    isNextVideo,
    setIsNextVideo,
    setIsShowModal,
    videoData = {},
    handleNextVideo,
    handlePrevVideo,
}) {
    const [count, setCount] = useState(3);
    const intervalRef = useRef(null);
    useEffect(() => {
        if (isNextVideo && count > 0) {
            intervalRef.current = setInterval(() => {
                setCount((state) => state - 1);
            }, 1000);
            return () => {
                clearInterval(intervalRef.current);
            };
        }
    }, [isNextVideo]);
    useEffect(() => {
        if (count === 0) {
            clearInterval(intervalRef.current);
            setIsNextVideo(false);
            setCount(3);
        }
    }, [count]);
    return (
        <div className={clsx(styles.overlay)}>
            <div className={clsx(styles.modal)}>
                <div className={clsx(styles.aspectRatio)}>
                    <button
                        className={clsx(styles.btn, styles.close)}
                        onClick={() => setIsShowModal(false)}
                    >
                        <MdOutlineClose />
                    </button>
                    <button className={clsx(styles.btn, styles.prev)} onClick={handlePrevVideo}>
                        <MdArrowBackIosNew />
                    </button>
                    <button className={clsx(styles.btn, styles.next)} onClick={handleNextVideo}>
                        <MdOutlineArrowForwardIos />
                    </button>
                    {isNextVideo ? (
                        <div className={clsx(styles.waiting)}>
                            <span>Video tiếp theo sẽ phát sau {count} giây...</span>
                        </div>
                    ) : (
                        <VideoPlay
                            videoId={videoData.video_id}
                            videoLink={videoData.video_link}
                            autoPlay
                            handleEndedVideo={handleNextVideo}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Modal;
