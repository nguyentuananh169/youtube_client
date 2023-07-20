import clsx from 'clsx';
import useStore from '../../../hook/useStore';
import styles from './Right.module.css';
function Right({ isMobile, children }) {
    const [state] = useStore();
    const { isToggleNavbar, isHiddenHeader } = state;
    return (
        <div
            className={clsx(styles.wrapper, {
                [styles.toggle]: isToggleNavbar,
                [styles.mobile]: isMobile,
                [styles.hiddenHeader]: isHiddenHeader,
            })}
        >
            <div className={clsx(styles.container)}>{children}</div>
        </div>
    );
}

export default Right;
