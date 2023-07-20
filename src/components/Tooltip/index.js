import clsx from 'clsx';
import styles from './Tooltip.module.css';
function Tooltip({ content, customStyle = {}, ...classes }) {
    return (
        <div
            data-class="tooltip"
            className={clsx(styles.tooltip)}
            style={{ ...customStyle }}
            {...classes}
        >
            <span>{content}</span>
        </div>
    );
}

export default Tooltip;
