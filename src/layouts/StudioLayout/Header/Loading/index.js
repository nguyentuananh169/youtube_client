import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Loading.module.css';
function Loading() {
    const wrapperRef = useRef(null);
    const timeoutRef = useRef(null);
    const { pathname } = useLocation();
    useEffect(() => {
        wrapperRef.current.setAttribute('data-loading', 'pending');
        timeoutRef.current = setTimeout(() => {
            wrapperRef.current.setAttribute('data-loading', 'success');
        }, 2000);
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, [pathname]);
    return <div ref={wrapperRef} className={clsx(styles.wrapper)}></div>;
}

export default Loading;
