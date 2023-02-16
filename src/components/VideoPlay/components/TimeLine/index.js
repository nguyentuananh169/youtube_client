import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import styles from './TimeLine.module.css';
function TimeLine({ handleClickTimeLine, handleMouseMoveTimeLine, handleMouseOutTimeLine }) {
    const timeLineRef = useRef(null);
    useEffect(() => {
        timeLineRef.current.addEventListener('mousedown', () => {
            document.body.style.userSelect = 'none';
            document.addEventListener('mousemove', handleClickTimeLine);
        });
        document.addEventListener('mouseup', () => {
            document.body.style.userSelect = 'auto';
            document.removeEventListener('mousemove', handleClickTimeLine);
        });
        return () => {
            document.removeEventListener('mouseup', () => {
                document.body.style.userSelect = 'auto';
                document.removeEventListener('mousemove', handleClickTimeLine);
            });
        };
    }, []);
    return (
        <div
            ref={timeLineRef}
            className={clsx(styles.timeLineContainer)}
            onMouseMove={handleMouseMoveTimeLine}
            onMouseOut={handleMouseOutTimeLine}
            onClick={handleClickTimeLine}
        >
            <div className={clsx(styles.timeLine)}>
                <div
                    className={clsx(styles.indicator)}
                    onMouseMove={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                ></div>
            </div>
        </div>
    );
}

export default TimeLine;
