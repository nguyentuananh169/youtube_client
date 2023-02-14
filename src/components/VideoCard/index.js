import clsx from 'clsx';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import VideoControl from '../VideoControl';
import styles from './VideoCard.module.css';
function VideoCard({ ...classes }) {
    const [isHover, setIsHover] = useState(false);
    const timeoutRef = useRef(null);
    const handleMouseOver = () => {
        timeoutRef.current = setTimeout(() => {
            setIsHover(true);
        }, 1500);
    };
    const handleMouseOutThumbnail = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };
    const handleMouseOut = () => {
        setIsHover(false);
    };
    return (
        <div
            className={clsx(styles.wrapper, { [styles.scale]: isHover })}
            style={{ ...classes }}
            onMouseLeave={handleMouseOut}
        >
            <Link to={`/watch/22`}>
                <div
                    className={clsx(styles.thumbnail)}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOutThumbnail}
                >
                    <span className={clsx(styles.note)}>Tiếp tục di chuột để phát</span>
                    <img src="https://i.ytimg.com/vi/6HR4pEcXoQw/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD5KLku323I-jikbM6fOwVRs8DA1g" />
                    <div className={clsx(styles.video)}>{isHover && <VideoControl />}</div>
                </div>
                <div className={clsx(styles.details)}>
                    <div className={clsx(styles.avatar)}>
                        <img src="https://yt3.ggpht.com/ytc/AMLnZu9KlwLL0Yzzr-tZwKG265BQXjq_wNRSFCCR96zduQ=s68-c-k-c0x00ffffff-no-rj" />
                    </div>
                    <div className={clsx(styles.meta)}>
                        <div className={clsx(styles.title)}>
                            <p className={clsx(styles.text)}>Messi & Ronaldo - Wavin' Flag.</p>
                            <span className={clsx(styles.icon, 'material-symbols-outlined')}>
                                more_vert
                            </span>
                        </div>
                        <p className={clsx(styles.nameChannel)}>Arogal</p>
                        <p className={clsx(styles.metaLine)}>4,1 Tr lượt xem • 3 năm trước</p>
                    </div>
                </div>
            </Link>
            <div className={clsx(styles.buttons)}>
                <div className={clsx(styles.btn1)}>
                    <Button>
                        <span className="material-symbols-outlined">schedule</span>
                        <span className={clsx(styles.text)}>Xem trước</span>
                    </Button>
                </div>
                <div className={clsx(styles.btn2)}>
                    <Button>
                        <span className="material-symbols-outlined">playlist_play</span>
                        <span className={clsx(styles.text)}>Thêm vào danh sách chờ</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default VideoCard;
