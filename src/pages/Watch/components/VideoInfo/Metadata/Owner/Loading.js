import clsx from 'clsx';
import SkeletonLoading from '../../../../../../components/SkeletonLoading';
import styles from './Owner.module.css';
function Loading() {
    return (
        <div className={clsx(styles.owner)}>
            <div className={clsx(styles.ownerInfo)}>
                <div className={clsx(styles.avatar)}>
                    <SkeletonLoading height="40px" width="40px" circle />
                </div>
                <div className={clsx(styles.info)}>
                    <div className={clsx(styles.name)}>
                        <SkeletonLoading width="100px" height="15px" />
                    </div>
                    <div className={clsx(styles.subscriber)}>
                        <SkeletonLoading width="70px" height="15px" />
                    </div>
                </div>
            </div>
            <div className={clsx(styles.subscribeButton)}>
                <SkeletonLoading width="82px" height="36px" />
            </div>
        </div>
    );
}

export default Loading;
