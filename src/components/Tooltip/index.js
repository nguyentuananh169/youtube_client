import clsx from 'clsx';
import styles from './Tooltip.module.css';
function Tooltip({ content, customStyle = {} }) {
    return (
        <div className={clsx(styles.tooltip)} style={{ ...customStyle }}>
            <span>{content}</span>
        </div>
    );
}

export default Tooltip;
