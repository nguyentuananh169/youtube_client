import {
    BsFillPlayFill,
    BsFillPauseFill,
    BsFillVolumeUpFill,
    BsVolumeDownFill,
    BsVolumeMuteFill,
    BsFillSkipEndFill,
    BsPlayCircle,
} from 'react-icons/bs';
import clsx from 'clsx';
import styles from '../Controls.module.css';
function ControlLeft({ isPlay, handlePlayVideo }) {
    return (
        <>
            <div className={clsx(styles.btn, styles.play)} onClick={handlePlayVideo}>
                <div className={clsx(styles.tooltip)}>{`Phát (k)`}</div>
                {isPlay ? <BsFillPauseFill /> : <BsFillPlayFill />}
            </div>
            <div className={clsx(styles.btn, styles.skip)}>
                <BsFillSkipEndFill />
            </div>
            <div className={clsx(styles.volumeContainer)}>
                <div className={clsx(styles.btn, styles.volume)}>
                    <div className={clsx(styles.tooltip)} style={{ left: '-40%' }}>
                        {'Tắt tiếng (m)' || 'Mở tiếng (m)'}
                    </div>
                    {<BsVolumeMuteFill />}
                    {/* {volumeLevel === 'low' && <BsVolumeDownFill />}
{volumeLevel === 'full' && <BsFillVolumeUpFill />} */}
                </div>
                <div className={clsx(styles.volumeLine)}>
                    <input
                        type="range"
                        min={0}
                        max="10"
                        step={1}
                        // onChange={(e) => handleChaneVolume(e.target.value)}
                    />
                </div>
            </div>
            <div className={clsx(styles.volumeLine)}></div>
            <div className={clsx(styles.text)}>
                <span>0:0</span>
                <span> / </span>
                <span>0:0</span>
            </div>
            <div className={clsx(styles.title)}>
                <span style={{ marginRight: '10px', display: 'inline-block' }}>•</span>
                <span>How To Create The YouTube Video Player</span>
            </div>
        </>
    );
}

export default ControlLeft;
