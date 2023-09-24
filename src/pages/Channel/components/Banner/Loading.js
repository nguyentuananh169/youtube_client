import clsx from 'clsx';
import SkeletonLoading from '../../../../components/SkeletonLoading';

import styles from './Banner.module.css';
function Loading() {
    return (
        <div className={clsx(styles.banner, styles.loading)}>
            <SkeletonLoading />
        </div>
    );
}

export default Loading;
