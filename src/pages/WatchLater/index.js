import clsx from 'clsx';
import styles from './WatchLater.module.css';
import NoResult from '../../components/NoResult';
function WatchLater() {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.title)}>
                <span>Xem sau</span>
            </div>
            <NoResult text="Chưa có video nào trong danh sách phát này" />
        </div>
    );
}

export default WatchLater;
