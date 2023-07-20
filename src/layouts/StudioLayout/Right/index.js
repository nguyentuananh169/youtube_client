import clsx from 'clsx';
import styles from './Right.module.css';
import { useEffect, useRef } from 'react';
import useStore from '../../../hook/useStore';
import { setIsHiddenHeader2 } from '../../../store/actions';
import { useLocation } from 'react-router-dom';
function Right({ children }) {
    const wrapperRef = useRef(null);
    const [, dispatch] = useStore();
    const { pathname } = useLocation();
    useEffect(() => {
        if (window.innerWidth <= 768) {
            const element = wrapperRef.current;
            let prevScrollPos = element.scrollTop;
            const handleScroll = () => {
                const currentScrollPos = element.scrollTop;
                if (prevScrollPos < currentScrollPos && currentScrollPos > 100) {
                    dispatch(setIsHiddenHeader2(true));
                } else {
                    dispatch(setIsHiddenHeader2(false));
                }
                prevScrollPos = element.scrollTop;
            };
            element.addEventListener('scroll', handleScroll);
            return () => {
                element.removeEventListener('scroll', handleScroll);
            };
        }
    }, [pathname]);
    return (
        <div ref={wrapperRef} className={clsx(styles.wrapper, 'layout-right-studio')}>
            {children}
        </div>
    );
}

export default Right;
