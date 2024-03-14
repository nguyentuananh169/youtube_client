import clsx from 'clsx';
import styles from './LoadingHasMore.module.css';
function LoadingHasMore({ spinColor, customStyle = {} }) {
    return (
        <div className={clsx(styles.loading)} style={{ ...customStyle }}>
            <div
                className={clsx(styles.spinner)}
                style={{ borderColor: spinColor, borderTopColor: 'transparent' }}
            ></div>
        </div>
    );
}

export default LoadingHasMore;
