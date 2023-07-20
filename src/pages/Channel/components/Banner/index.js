import { useRef } from 'react';
import clsx from 'clsx';
import styles from './Banner.module.css';
function Banner() {
    const wrapperRef = useRef(null);

    return <div ref={wrapperRef} className={clsx(styles.wrapper)}></div>;
}

export default Banner;
