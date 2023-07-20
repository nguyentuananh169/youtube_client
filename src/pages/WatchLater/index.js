import clsx from 'clsx';
import styles from './WatchLater.module.css';
function WatchLater() {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.title)}>
                <span>Xem sau</span>
            </div>
            <div className={clsx(styles.noData)}>
                <span>Chưa có video nào trong danh sách phát này</span>
            </div>
        </div>
    );
}

export default WatchLater;
