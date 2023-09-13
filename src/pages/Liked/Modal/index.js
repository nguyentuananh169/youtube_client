import { TfiClose } from 'react-icons/tfi';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import VideoPlay from '../../../components/VideoPlay';
import styles from './Modal.module.css';
import { useRef } from 'react';
function Modal({ isNextVideo, setIsNextVideo, setIsShowModal, videoData = {}, handleEndedVideo }) {
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
                <button className={clsx(styles.close)} onClick={() => setIsShowModal(false)}>
                    <TfiClose size={22} />
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
                        handleEndedVideo={handleEndedVideo}
                    />
                )}
            </div>
        </div>
    );
}

export default Modal;
