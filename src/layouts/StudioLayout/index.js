import { useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import Header from './Header';
import Left from './Left';
import Right from './Right';
import styles from './Studio.module.css';
function StudioLayout({ children }) {
    const wrapperRef = useRef(null);
    const headerRef = useRef(null);
    const isToggleNavbar2 = useSelector((state) => state.toggleNavbar.isToggleNavbar2);
    const isLogin = useSelector((state) => state.auth.isLogin);
    useEffect(() => {
        if (headerRef.current && wrapperRef.current) {
            const headerEl = headerRef.current;
            const wrapperEl = wrapperRef.current;
            const headerHeight = headerEl.getBoundingClientRect().height;
            wrapperEl.style.setProperty('--header-height', `${headerHeight}px`);
        }
    }, []);
    if (!isLogin) {
        return <Navigate to="/login" />;
    }
    return (
        <div
            ref={wrapperRef}
            className={clsx(styles.wrapper, { [styles.toggleNavbar]: isToggleNavbar2 })}
        >
            <Header headerRef={headerRef} />
            <main className={clsx(styles.main)}>
                <Left />
                <Right>{children}</Right>
            </main>
        </div>
    );
}

export default StudioLayout;
