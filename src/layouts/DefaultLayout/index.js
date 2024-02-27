import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import Header from './Header';
import Left from './Left';
import Right from './Right';
import { setIsToggleNavBar } from '../../store/actions/toggleNavbar';
import styles from './DefaultLayout.module.css';

function DefaultLayout({ isMobile = false, children }) {
    const dispatch = useDispatch();
    const isToggleNavbar = useSelector((state) => state.toggleNavbar.isToggleNavbar);
    const { pathname } = useLocation();
    useEffect(() => {
        const screenWidth = window.innerWidth;
        if (isToggleNavbar && (isMobile || screenWidth <= 1330)) {
            dispatch(setIsToggleNavBar(false));
        }
    }, [pathname]);
    return (
        <>
            <Header />
            <div className={clsx(styles.main)}>
                <Left isMobile={isMobile} />
                <Right isMobile={isMobile}>{children}</Right>
            </div>
        </>
    );
}

export default DefaultLayout;
