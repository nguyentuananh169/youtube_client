import clsx from 'clsx';
import SkeletonLoading from '../../../../../components/SkeletonLoading';
import styles from './UserResults.module.css';
function Loading() {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.avatar)}>
                <SkeletonLoading width="136px" height="136px" circle />
            </div>
            <div className={clsx(styles.info)}>
                <div className={clsx(styles.channel)}>
                    <div className={clsx(styles.name)}>
                        <SkeletonLoading width="150px" height="25px" />
                    </div>
                    <div className={clsx(styles.offical)}>
                        <SkeletonLoading width="20px" height="20px" circle />
                    </div>
                </div>
                <div className={clsx(styles.metadata)}>
                    <SkeletonLoading width="200px" height="20px" />
                    <div style={{ marginTop: '5px' }}></div>
                    <SkeletonLoading width="200px" height="20px" />
                </div>
            </div>
        </div>
    );
}

export default Loading;
