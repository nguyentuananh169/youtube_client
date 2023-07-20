import clsx from 'clsx';
import styles from './MenuFixed.module.css';
import { useEffect, useRef, useState } from 'react';
function MenuFixed({
    isDisableScroll = false,
    menulist = [],
    customStyle = {},
    initPosition = { top: 0, left: 0 },
    children,
}) {
    const [position, setPosition] = useState(initPosition);
    const wrapperRef = useRef(null);
    useEffect(() => {
        const handleUpdatePosition = () => {
            const menuElement = wrapperRef.current;
            const parentElement = menuElement.parentElement;
            const parentRect = parentElement.getBoundingClientRect();
            const popupRect = menuElement.getBoundingClientRect();

            let top = parentRect.top + parentRect.height;
            let left = parentRect.left + parentRect.width;

            if (top + popupRect.height > window.innerHeight) {
                top = parentRect.top - popupRect.height;
            }

            if (left + popupRect.width > window.innerWidth) {
                left = parentRect.right - popupRect.width;
            }

            setPosition({ top, left });
        };
        handleUpdatePosition();
        window.addEventListener('resize', handleUpdatePosition);
        return () => {
            window.removeEventListener('resize', handleUpdatePosition);
        };
    }, []);
    useEffect(() => {
        if (isDisableScroll && menulist.length > 0) {
            const sY = window.pageYOffset || document.documentElement.scrollTop;
            const sX = window.pageXOffset || document.documentElement.scrollLeft;
            const handleDisableScroll = () => {
                window.scrollTo(sX, sY);
            };

            window.addEventListener('scroll', handleDisableScroll);
            return () => {
                window.removeEventListener('scroll', handleDisableScroll);
            };
        } else {
            window.addEventListener('scroll', () => {});
            return () => {
                window.removeEventListener('scroll', () => {});
            };
        }
    }, [isDisableScroll]);
    return (
        <div
            ref={wrapperRef}
            className={clsx(styles.wrapper)}
            style={{ ...position, ...customStyle }}
            onMouseDown={(e) => e.stopPropagation()}
        >
            <ul className={clsx(styles.menu)} onClick={(e) => e.stopPropagation()}>
                {menulist.length > 0 && (
                    <>
                        {menulist.map((item, index) => (
                            <li
                                className={clsx(styles.item)}
                                style={item.customStyle}
                                key={index}
                                onClick={item.onClick}
                            >
                                {item.icon}
                                <span>{item.text}</span>
                            </li>
                        ))}
                    </>
                )}
                {children}
            </ul>
        </div>
    );
}

export default MenuFixed;
