import clsx from 'clsx';
import styles from './Right.module.css';
function Right({ children, isToggleGuide, guideType }) {
    return (
        <div
            className={clsx(styles.wrapper, {
                [styles.toggle]: isToggleGuide,
            })}
            data-type={guideType}
        >
            <div className={clsx(styles.container)}>{children}</div>
        </div>
    );
}

export default Right;
