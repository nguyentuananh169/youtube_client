import clsx from 'clsx';
import SkeletonLoading from '../../../components/SkeletonLoading';
import styles from './VideoCard.module.css';
function Loading() {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.container)}>
                <div className={clsx(styles.aspectRatio)}>
                    <SkeletonLoading
                        width="338px"
                        customStyles={{ display: 'block', margin: '0 auto' }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Loading;
