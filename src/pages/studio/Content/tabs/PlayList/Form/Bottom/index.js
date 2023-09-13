import clsx from 'clsx';
import styles from './Bottom.module.css';
function Bottom({ isLoading, handleCloseModal }) {
    return (
        <div className={clsx(styles.wrapper)}>
            <label onClick={handleCloseModal}>hủy</label>
            <button className={clsx({ [styles.disable]: isLoading })}>
                {isLoading ? 'Đang lưu' : 'Lưu'}
            </button>
        </div>
    );
}

export default Bottom;
