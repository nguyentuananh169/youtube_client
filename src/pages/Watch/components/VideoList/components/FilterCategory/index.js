import clsx from 'clsx';
import styles from './FilterCategory.module.css';
function FilterCategory() {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.list)}>
                <div className={clsx(styles.item)}>
                    <span>Tất cả</span>
                </div>
                <div className={clsx(styles.item)}>
                    <span>Video có liên quan</span>
                </div>
                <div className={clsx(styles.item)}>
                    <span>Trực tiếp</span>
                </div>
                <div className={clsx(styles.item)}>
                    <span>Tải lên gần đây</span>
                </div>
                <div className={clsx(styles.item)}>
                    <span>Đã xem</span>
                </div>
                <div className={clsx(styles.item)}>
                    <span>Đã xem</span>
                </div>
                <div className={clsx(styles.item)}>
                    <span>Đã xem</span>
                </div>
                <div className={clsx(styles.item)}>
                    <span>Đã xem</span>
                </div>
            </div>
        </div>
    );
}

export default FilterCategory;
