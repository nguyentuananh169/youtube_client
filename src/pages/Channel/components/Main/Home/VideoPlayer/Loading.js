import clsx from 'clsx';
import SkeletonLoading from '../../../../../../components/SkeletonLoading';
import styles from './VideoPlayer.module.css';
function Loading() {
    return (
        <>
            <div className={clsx(styles.videoPlayer)}>
                <SkeletonLoading height="236px" />
            </div>
            <div className={clsx(styles.details)}>
                <div className={clsx(styles.title)}>
                    <SkeletonLoading height="30px" />
                </div>
                <div className={clsx(styles.time)}>
                    <SkeletonLoading width="50%" height="15px" />
                </div>
                <div className={clsx(styles.des)}>
                    <SkeletonLoading height="160px" />
                </div>
            </div>
        </>
    );
}

export default Loading;
