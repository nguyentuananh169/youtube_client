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
import { Link, useLocation, useParams } from 'react-router-dom';
function LeftControls({
    isPreview,
    isAutoSkip,
    size,
    dataSetting,
    currentTimeRef,
    totalTimeRef,
    handleClickVideo,
    handleClickVolume,
    handleChangeVolume,
    nextVideoInfo,
}) {
    const volumeRef = useRef(null);
    const { search } = useLocation();
    let urlParams = search;
    if (nextVideoInfo?.id) {
        urlParams =
            nextVideoInfo.type === 'playlist'
                ? `/watch?category=${nextVideoInfo.categoryId}&id=${nextVideoInfo.id}&list=${nextVideoInfo.playlist}&index=${nextVideoInfo.index}`
                : `/watch?category=${nextVideoInfo.categoryId}&id=${nextVideoInfo.id}`;
    }
    useEffect(() => {
        if (dataSetting.isVolume) {
            volumeRef.current.value = 10;
        } else {
            volumeRef.current.value = 0;
        }
    }, [dataSetting.isVolume]);
    return (
        <div
            className={clsx(styles.wrapper, {
                [styles.preview]: isPreview,
                [styles[size]]: size,
            })}
        >
            <div
                className={clsx(styles.btn, styles.play, styles.tooltip)}
                onClick={handleClickVideo}
            >
                <Tooltip
                    content={dataSetting.isPlay ? 'Tạm dừng (k)' : 'Phát (k)'}
                    customStyle={{
                        left: '0',
                        whiteSpace: 'nowrap',
                        bottom: 'calc(100% + 10px)',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    }}
                />
                {dataSetting.isPlay ? <BsFillPauseFill /> : <BsFillPlayFill />}
            </div>
            {isAutoSkip && (
                <Link to={urlParams} className={clsx(styles.btn, styles.skip)}>
                    <BsFillSkipEndFill />
                </Link>
            )}

            <div className={clsx(styles.volumeContainer)}>
                <div
                    className={clsx(styles.btn, styles.volume, styles.tooltip)}
                    onClick={handleClickVolume}
                >
                    <Tooltip
                        content={dataSetting.isVolume ? 'Tắt tiếng (m)' : 'Mở tiếng (m)'}
                        customStyle={{
                            [`${isPreview || 'left'}`]: '-40%',
                            [`${isPreview && 'right'}`]: '0',
                            whiteSpace: 'nowrap',
                            [`${isPreview ? 'top' : 'bottom'}`]: 'calc(100% + 10px)',
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        }}
                    />
                    {dataSetting.volumeLevel === 'mute' && <BsVolumeMuteFill />}
                    {dataSetting.volumeLevel === 'low' && <BsVolumeDownFill />}
                    {dataSetting.volumeLevel === 'full' && <BsFillVolumeUpFill />}
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
            <div className={clsx(styles.text)}>
                <span ref={currentTimeRef}>0:0</span>
                <span> / </span>
                <span ref={totalTimeRef}>0:0</span>
            </div>
        </div>
    );
}

export default LeftControls;
