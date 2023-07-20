import clsx from 'clsx';
import styles from './Diary.module.css';
function Diary() {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.title)}>
                <span>Nhật ký xem</span>
            </div>
            <div className={clsx(styles.noData)}>
                <span>Danh sách này không có video nào.</span>
            </div>
        </div>
    );
}

export default Diary;
