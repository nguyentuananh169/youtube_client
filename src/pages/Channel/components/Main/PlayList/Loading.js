import clsx from 'clsx';
import SkeletonLoading from '../../../../../components/SkeletonLoading';
import styles from './PlayList.module.css';
function Loading() {
    return (
        <div className={clsx(styles.card)}>
            <div className={clsx(styles.img)}>
                <div className={clsx(styles.aspectRatio)}>
                    <SkeletonLoading />
                </div>
            </div>
            <div className={clsx(styles.title)}>
                <SkeletonLoading height="30px" />
            </div>
            <div className={clsx(styles.time)}>
                <SkeletonLoading height="15px" />
            </div>
            <div className={clsx(styles.more)}>
                <SkeletonLoading height="15px" />
            </div>
        </div>
    );
}

export default Loading;
