import clsx from 'clsx';
import SkeletonLoading from '../../../../components/SkeletonLoading';
import styles from './Header.module.css';
function Loading() {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.container)}>
                <div className={clsx(styles.img)}>
                    <SkeletonLoading circle />
                </div>
                <div className={clsx(styles.owner)}>
                    <div className={clsx(styles.name)}>
                        <SkeletonLoading width="180px" height="30px" />
                    </div>
                    <div className={clsx(styles.meta)}>
                        <SkeletonLoading width="290px" height="15px" />
                    </div>
                    <div className={clsx(styles.about)}>
                        <SkeletonLoading width="290px" height="15px" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Loading;
