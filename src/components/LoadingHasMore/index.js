import clsx from 'clsx';
import styles from './LoadingHasMore.module.css';
function LoadingHasMore({ customStyle = {} }) {
    return (
        <div className={clsx(styles.loading)} style={{ ...customStyle }}>
            <div className={clsx(styles.spinner)}></div>
        </div>
    );
}

export default LoadingHasMore;
