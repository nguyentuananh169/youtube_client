import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import Image from './Image';
import MainMenu from './MainMenu';
import BottomSection from './BottomSection';
import { setIsToggleNavBar2 } from '../../../store/actions/toggleNavbar';
import styles from './Left.module.css';
function Left() {
    const dispatch = useDispatch();
    const isToggleNavbar2 = useSelector((state) => state.toggleNavbar.isToggleNavbar2);
    const location = useLocation();
    useEffect(() => {
        const screenWidth = window.innerWidth;
        if (isToggleNavbar2 && screenWidth <= 992) {
            dispatch(setIsToggleNavBar2(false));
        }
    }, [location.pathname]);
    return (
        <>
            <div
                className={clsx(styles.overlay, { [styles.toggleNavbar]: isToggleNavbar2 })}
                onClick={() => dispatch(setIsToggleNavBar2())}
            ></div>
            <div className={clsx(styles.wrapper, { [styles.toggleNavbar]: isToggleNavbar2 })}>
                <Image />
                <MainMenu />
                <BottomSection />
            </div>
        </>
    );
}

export default Left;
