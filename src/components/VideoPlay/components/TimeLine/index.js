import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import styles from './TimeLine.module.css';
function TimeLine({
    isTouchDevice,
    isPreview,
    size,
    timeLineRef,
    handlePauseVideo,
    handlePlayVideo,
    handleClickTimeLine,
    handleMouseMoveTimeLine,
    handleMouseOutTimeLine,
}) {
    const wrapperRef = useRef(null);
    const activeRef = useRef(false);

    useEffect(() => {
        if (isPreview) {
            return;
        }
        if (isTouchDevice) {
            wrapperRef.current.addEventListener('touchstart', () => {
                handlePauseVideo();
                activeRef.current = true;
                document.body.style.userSelect = 'none';
                document.addEventListener('touchmove', handleClickTimeLine);
            });
            return () => {
                document.removeEventListener('touchstart', () => {
                    document.removeEventListener('touchmove', handleClickTimeLine);
                });
            };
        } else {
            wrapperRef.current.addEventListener('mousedown', () => {
                handlePauseVideo();
                activeRef.current = true;
                document.body.style.userSelect = 'none';
                document.addEventListener('mousemove', handleClickTimeLine);
            });
            return () => {
                document.removeEventListener('mousedown', () => {
                    document.removeEventListener('mousemove', handleClickTimeLine);
                });
            };
        }
    }, []);
    useEffect(() => {
        if (isPreview) {
            return;
        }
        if (isTouchDevice) {
            document.addEventListener('touchend', () => {
                if (activeRef.current) {
                    handlePlayVideo();
                }
                activeRef.current = false;
                document.body.style.userSelect = 'auto';
                document.removeEventListener('touchmove', handleClickTimeLine);
            });
            return () => {
                document.removeEventListener('touchend', () => {
                    document.body.style.userSelect = 'auto';
                    document.removeEventListener('touchmove', handleClickTimeLine);
                });
            };
        } else {
            document.addEventListener('mouseup', () => {
                if (activeRef.current) {
                    handlePlayVideo();
                }
                activeRef.current = false;
                document.body.style.userSelect = 'auto';
                document.removeEventListener('mousemove', handleClickTimeLine);
            });
            return () => {
                document.removeEventListener('mouseup', () => {
                    document.body.style.userSelect = 'auto';
                    document.removeEventListener('mousemove', handleClickTimeLine);
                });
            };
        }
    }, []);

    return (
        <div
            ref={wrapperRef}
            className={clsx(styles.wrapper, {
                [styles.preview]: isPreview,
                [styles[size]]: size,
            })}
            onMouseMove={handleMouseMoveTimeLine}
            onMouseOut={handleMouseOutTimeLine}
            onClick={handleClickTimeLine}
        >
            <div ref={timeLineRef} className={clsx(styles.timeLine)}>
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
