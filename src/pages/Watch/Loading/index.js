import clsx from 'clsx';
import SkeletonLoading from '../../../components/SkeletonLoading';
import OwnerLoading from '../components/VideoInfo/Metadata/Owner/Loading';
import styles from './Loading.module.css';
function Loading() {
    return (
        <div className={clsx(styles.main)}>
            <div className={clsx(styles.video)}>
                <SkeletonLoading />
            </div>
            <div className={clsx(styles.title)}>
                <SkeletonLoading height="30px" />
            </div>
            <div className={clsx(styles.owner)}>
                <OwnerLoading />
            </div>
        </div>
    );
}

export default Loading;
