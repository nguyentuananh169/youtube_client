import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import styles from './NextVideo.module.css';
function NextVideo({ size, handleNextVideo, videoInfo }) {
    const [count, setCount] = useState(5);
    const intervalRef = useRef(null);
    const navigate = useNavigate();
    const urlParams =
        videoInfo.type === 'playlist'
            ? `/watch?category=${videoInfo.categoryId}&id=${videoInfo.id}&list=${videoInfo.playlist}&index=${videoInfo.index}`
            : `/watch?category=${videoInfo.categoryId}&id=${videoInfo.id}`;
    useEffect(() => {
        if (count > 0) {
            intervalRef.current = setInterval(() => {
                setCount(count - 1);
            }, 1000);
            return () => {
                clearInterval(intervalRef.current);
            };
        } else {
            navigate(urlParams);
        }
    }, [count]);
    return (
        <div className={clsx(styles.wrapper, { [styles[size]]: size })}>
            <div className={clsx(styles.count)}>
                <span>Video tiếp theo sau</span>
                <strong>{count}</strong>
            </div>
            <div className={clsx(styles.main)}>
                <div className={clsx(styles.img)}>
                    <div className={clsx(styles.aspectRatio)}>
                        <img src={videoInfo.poster} />
                    </div>
                </div>
                <div className={clsx(styles.info)}>
                    <div className={clsx(styles.title)}>
                        <span>{videoInfo.title}</span>
                    </div>
                    <div className={clsx(styles.owner)}>
                        <span>{videoInfo.userName}</span>
                    </div>
                </div>
            </div>
            <div className={clsx(styles.actions)}>
                <button className={clsx(styles.btn)} onClick={() => handleNextVideo(false)}>
                    Hủy
                </button>
                <Link to={urlParams} className={clsx(styles.btn)}>
                    Phát ngay
                </Link>
            </div>
        </div>
    );
}

export default NextVideo;
