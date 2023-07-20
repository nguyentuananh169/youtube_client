import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './NextVideo.module.css';
import { Link } from 'react-router-dom';
function NextVideo({ size, handleNextVideo }) {
    const [count, setCount] = useState(5);
    const intervalRef = useRef(null);
    useEffect(() => {
        if (count > 0) {
            intervalRef.current = setInterval(() => {
                setCount(count - 1);
            }, 1000);
            return () => clearInterval(intervalRef.current);
        } else {
            alert('nhay');
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
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4vGZVmwB26utsZu3-KqDmknfOICrhH4R_fQ&usqp=CAU" />
                </div>
                <div className={clsx(styles.info)}>
                    <div className={clsx(styles.title)}>
                        <span>
                            Top 20 Bài Hát Hot Nhất Trên TikTok 2023 💘 Nhạc Remix Hot Trend Được Sử
                            Dụng Nhiều Nhất TikTok 2023
                        </span>
                    </div>
                    <div className={clsx(styles.owner)}>
                        <span>Bụi Chill</span>
                    </div>
                </div>
            </div>
            <div className={clsx(styles.actions)}>
                <button className={clsx(styles.btn)} onClick={handleNextVideo}>
                    Hủy
                </button>
                <Link to="#" className={clsx(styles.btn)}>
                    Phát ngay
                </Link>
            </div>
        </div>
    );
}

export default NextVideo;
