import { BsFilterLeft } from 'react-icons/bs';
import clsx from 'clsx';
import styles from './Filter.module.css';
import { useState } from 'react';
import useClickOutSide from '../../../../../../hook/useClickOutSide';
function Filter() {
    const [isActive, setActive] = useState(false);
    const [elementRef, isShow, setShow] = useClickOutSide();
    const handleMouseDown = (e) => {
        const clientX = e.clientX;
        const clientY = e.pageY;
        const element = elementRef.current;
        const elementWidth = element.clientWidth;
        const elementHeight = element.clientHeight;
        const elementLeft = element.offsetLeft;
        const elementTop = element.offsetTop;
        const percentLeft = Math.round(((clientX - elementLeft) / elementWidth) * 100);
        const percentTop = Math.round(((clientY - elementTop) / elementHeight) * 100);
        element.style.setProperty('--positionLeft', `${percentLeft}%`);
        element.style.setProperty('--positionTop', `${percentTop}%`);
        element.setAttribute('data-animation', 'mouseDown');
    };
    const handleMouseUp = () => {
        const element = elementRef.current;
        element.setAttribute('data-animation', 'mouseUp');
    };

    return (
        <div className={clsx(styles.filterContainer)}>
            <span className={clsx(styles.count)}>193 bình luận</span>
            <span
                ref={elementRef}
                className={clsx(styles.filter, { [styles.showMenu]: isShow })}
                onClick={() => setShow(!isShow)}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            >
                <BsFilterLeft />
                <span style={{ fontWeight: '500' }}>Sắp xếp theo</span>
                <div className={clsx(styles.menu)}>
                    <ul>
                        <li
                            className={clsx({ [styles.active]: !isActive })}
                            onClick={() => setActive(!isActive)}
                        >
                            Bình luận hành đầu
                        </li>
                        <li
                            className={clsx({ [styles.active]: isActive })}
                            onClick={() => setActive(!isActive)}
                        >
                            Mới nhất xếp trước
                        </li>
                    </ul>
                </div>
            </span>
        </div>
    );
}

export default Filter;
