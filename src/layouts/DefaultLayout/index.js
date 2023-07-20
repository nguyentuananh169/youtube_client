import { useEffect } from 'react';
import clsx from 'clsx';
import Header from './Header';
import Left from './Left';
import Right from './Right';

import styles from './DefaultLayout.module.css';
import useStore from '../../hook/useStore';
import { setIsToggleNavBar } from '../../store/actions';
import { useLocation } from 'react-router-dom';

function DefaultLayout({ isMobile = false, children }) {
    const [state, dispatch] = useStore();
    const { pathname } = useLocation();
    useEffect(() => {
        const screenWidth = window.innerWidth;
        if (state.isToggleNavbar && (isMobile || screenWidth <= 1330)) {
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
