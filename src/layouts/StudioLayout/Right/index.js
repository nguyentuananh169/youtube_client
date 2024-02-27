import clsx from 'clsx';
import styles from './Right.module.css';
function Right({ children }) {
    return <div className={clsx(styles.wrapper, 'layout-right-studio')}>{children}</div>;
}

export default Right;
