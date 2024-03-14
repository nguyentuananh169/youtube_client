import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import styles from './Right.module.css';
function Right({ isMobile, children }) {
    const { pathname } = useLocation();
    const isHiddenHeader = useSelector((state) => state.hiddenHeader.isHiddenHeader);
    const isToggleNavbar = useSelector((state) => state.toggleNavbar.isToggleNavbar);
    return (
        <div
            className={clsx(styles.wrapper, {
                [styles.toggle]: isToggleNavbar,
                [styles.mobile]: isMobile,
                [styles.hiddenHeader]: isHiddenHeader,
                [styles.pageShorts]: pathname === '/shorts',
            })}
        >
            <div className={clsx(styles.container)}>{children}</div>
        </div>
    );
}

export default Right;
