import clsx from 'clsx';
import styles from './Videos.module.css';
import SkeletonLoading from '../../../../../../components/SkeletonLoading';
function Loading() {
    return (
        <div className={clsx(styles.item)}>
            <div className={clsx(styles.poster)}>
                <div className={clsx(styles.number)}>
                    <SkeletonLoading width="10px" height="10px" />
                </div>
                <div className={clsx(styles.img)}>
                    <div className={clsx(styles.aspectRatio)}>
                        <SkeletonLoading />
                    </div>
                </div>
            </div>
            <div className={clsx(styles.info)}>
                <div className={clsx(styles.title)}>
                    <SkeletonLoading height="20px" />
                </div>
                <div className={clsx(styles.des)}>
                    <SkeletonLoading height="40px" />
                </div>
                <div className={clsx(styles.date)}>
                    <SkeletonLoading height="14px" />
                </div>
            </div>
        </div>
    );
}

export default Loading;
