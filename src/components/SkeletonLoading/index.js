import clsx from 'clsx';
import styles from './SkeletonLoading.module.css';
function SkeletonLoading({ count = 1, width = '100%', height = '100%', circle }) {
    return Array(count)
        .fill(0)
        .map((item, index) => (
            <div
                key={index}
                className={clsx(styles.wrapper, { [styles.circle]: circle })}
                style={{ width, height }}
            ></div>
        ));
}

export default SkeletonLoading;
