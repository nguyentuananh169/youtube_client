import clsx from 'clsx';
import styles from './Spinner.module.css';
function Spinner({ customStyle = {} }) {
    return (
        <div className={clsx(styles.loading)} style={{ ...customStyle }}>
            <div className={clsx(styles.spinner)}></div>
        </div>
    );
}

export default Spinner;
