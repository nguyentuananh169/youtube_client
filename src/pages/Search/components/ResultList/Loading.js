import clsx from 'clsx';
import styles from './ResultList.module.css';
function Loading() {
    return (
        <div className={clsx(styles.loading)}>
            <div className={clsx(styles.spinner)}></div>
        </div>
    );
}

export default Loading;
