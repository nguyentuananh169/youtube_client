import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Tooltip.module.css';
function Tooltip({ headingText, bodyText, bottomLink, children }) {
    const [position, setPosition] = useState({ left: 0, top: 0 });
    const wrapperRef = useRef(null);
    useEffect(() => {
        const rightEl = document.querySelector('.layout-right-studio');
        const handleResize = () => {
            const screenX = window.innerWidth;
            const element = wrapperRef.current;
            const parentElement = element.parentElement;
            const elementRect = element.getBoundingClientRect();
            const parentElementRect = parentElement.getBoundingClientRect();
            let top = parentElementRect.top - elementRect.height;
            let left = parentElementRect.left;

            if (top <= 0) {
                top = parentElementRect.top + parentElementRect.height;
            }

            if (left + elementRect.width > screenX) {
                left = screenX - elementRect.width;
            }
            setPosition({ top, left });
        };
        handleResize();
        rightEl.addEventListener('resize', handleResize);
        rightEl.addEventListener('scroll', handleResize);
        return () => {
            rightEl.removeEventListener('resize', handleResize);
            rightEl.removeEventListener('scroll', handleResize);
        };
    }, []);
    return (
        <div
            ref={wrapperRef}
            className={clsx(styles.wrapper)}
            style={{ ...position }}
            data-class="tooltip"
        >
            {headingText && (
                <div className={clsx(styles.heading, styles.gr)}>
                    <strong>{headingText}</strong>
                </div>
            )}
            {bodyText && (
                <div className={clsx(styles.body, styles.gr)}>
                    <span>{bodyText}</span>
                </div>
            )}
            {bottomLink && (
                <div className={clsx(styles.bottom, styles.gr)}>
                    <Link to={bottomLink}>Tìm hiểu thêm</Link>
                </div>
            )}
        </div>
    );
}

export default Tooltip;
