import clsx from 'clsx';
import styles from './Right.module.css';
function Right({ children, isFullWidth }) {
    return (
        <div className={clsx(styles.wrapper, { [styles.fullWidth]: isFullWidth })}>
            <div className={clsx(styles.container)}>{children}</div>
        </div>
    );
}

export default Right;
