import { RxDotsVertical } from 'react-icons/rx';
import { useRef } from 'react';
import clsx from 'clsx';
import styles from './DotMenu.module.css';
function DotMenu({ icon, customStyle = {} }) {
    const wrapperRef = useRef(null);
    const handleMouseDown = () => {
        wrapperRef.current.setAttribute('data-animation', 'mouseDown');
    };
    const handleMouseUp = () => {
        wrapperRef.current.setAttribute('data-animation', 'mouseUp');
    };
    return (
        <button
            ref={wrapperRef}
            className={clsx(styles.wrapper)}
            style={{ customStyle }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            {icon ? (
                icon
            ) : (
                <RxDotsVertical size={20} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} />
            )}
        </button>
    );
}

export default DotMenu;
