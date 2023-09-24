import clsx from 'clsx';
import SkeletonLoading from '../../../../../../components/SkeletonLoading';
import styles from './Item.module.css';
function Loading() {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.count)}>
                <SkeletonLoading width="10px" height="10px" />
            </div>
            <div className={clsx(styles.img)}>
                <div className={clsx(styles.aspectRatio)}>
                    <SkeletonLoading width="120px" />
                </div>
            </div>
            <div className={clsx(styles.info)}>
                <div className={clsx(styles.title)}>
                    <SkeletonLoading width="100%" height="30px" />
                </div>
                <div className={clsx(styles.userName)}>
                    <SkeletonLoading width="100%" height="20px" />
                </div>
            </div>
        </div>
    );
}

export default Loading;
