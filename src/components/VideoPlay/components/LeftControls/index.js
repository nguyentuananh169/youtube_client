import {
    BsFillPauseFill,
    BsFillPlayFill,
    BsFillSkipEndFill,
    BsVolumeMuteFill,
    BsVolumeDownFill,
    BsFillVolumeUpFill,
} from 'react-icons/bs';

import clsx from 'clsx';
import styles from './LeftControls.module.css';
import Tooltip from '../../../Tooltip';
import { useEffect, useRef } from 'react';
function LeftControls({
    isPlay,
    isVolume,
    volumeLevel,
    handleClickVideo,
    handleClickVolume,
    handleChangeVolume,
    children,
}) {
    const volumeRef = useRef(null);
    useEffect(() => {
        if (isVolume) {
            volumeRef.current.value = 10;
        } else {
            volumeRef.current.value = 0;
        }
    }, [isVolume]);
    return (
        <div className={clsx(styles.wrapper)}>
            <div
                className={clsx(styles.btn, styles.play, styles.tooltip)}
                onClick={handleClickVideo}
            >
                <Tooltip
                    content={'Phát (k)'}
                    customStyle={{
                        left: '0',
                        whiteSpace: 'nowrap',
                        bottom: 'calc(100% + 10px)',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    }}
                />
                {isPlay ? <BsFillPauseFill /> : <BsFillPlayFill />}
            </div>
            <div className={clsx(styles.btn, styles.skip)}>
                <BsFillSkipEndFill />
            </div>
            <div className={clsx(styles.volumeContainer)}>
                <div
                    className={clsx(styles.btn, styles.volume, styles.tooltip)}
                    onClick={handleClickVolume}
                >
                    <Tooltip
                        content={isVolume ? 'Tắt tiếng (m)' : 'Mở tiếng (m)'}
                        customStyle={{
                            left: '-40%',
                            whiteSpace: 'nowrap',
                            bottom: 'calc(100% + 10px)',
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        }}
                    />
                    {volumeLevel === 'mute' && <BsVolumeMuteFill />}
                    {volumeLevel === 'low' && <BsVolumeDownFill />}
                    {volumeLevel === 'full' && <BsFillVolumeUpFill />}
                </div>
                <div className={clsx(styles.volumeLine)}>
                    <input
                        ref={volumeRef}
                        type="range"
                        min={0}
                        max="10"
                        step={1}
                        onChange={(e) => {
                            handleChangeVolume(e.target.value);
                        }}
                    />
                </div>
            </div>
            <div className={clsx(styles.volumeLine)}></div>
            <div className={clsx(styles.text)}>{children}</div>
            <div className={clsx(styles.title)}>
                <span style={{ marginRight: '10px', display: 'inline-block' }}>•</span>
                <span>How To Create The YouTube Video Player</span>
            </div>
        </div>
    );
}

export default LeftControls;
