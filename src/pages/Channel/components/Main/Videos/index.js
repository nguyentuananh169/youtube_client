import { useRef, useState } from 'react';
import clsx from 'clsx';
import VideoCard from '../../../../../components/VideoCard';
import styles from './Videos.module.css';
function Videos() {
    const [buttonActive, setButtonActive] = useState(true);
    const listContainerRef = useRef(null);
    const handleClickButton = () => {
        setButtonActive(!buttonActive);
    };

    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.category)}>
                <button
                    className={clsx({ [styles.active]: buttonActive })}
                    onClick={handleClickButton}
                >
                    Mới nhất
                </button>
                <button
                    className={clsx({ [styles.active]: !buttonActive })}
                    onClick={handleClickButton}
                >
                    Phổ biến
                </button>
            </div>
            <div ref={listContainerRef} className={clsx(styles.listContainer)}>
                <div className={clsx(styles.list)}>
                    {Array(10)
                        .fill(0)
                        .map((item, index) => (
                            <div key={index} className={clsx(styles.videoCard)}>
                                <VideoCard hidenOwner />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Videos;
