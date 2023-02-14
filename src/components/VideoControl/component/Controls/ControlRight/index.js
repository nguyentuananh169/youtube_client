import { RiClosedCaptioningLine } from 'react-icons/ri';
import { MdSettings } from 'react-icons/md';
import { CgToggleSquareOff, CgToggleSquare } from 'react-icons/cg';
import { FaChromecast } from 'react-icons/fa';
import { BiFullscreen, BiExitFullscreen, BiAbacus } from 'react-icons/bi';
import { RiDoubleQuotesR } from 'react-icons/ri';
import { AiOutlineCheck } from 'react-icons/ai';
import clsx from 'clsx';
import styles from '../Controls.module.css';
function ControlRight() {
    return (
        <>
            <div className={clsx(styles.btn, styles.caption)}>
                <div className={clsx(styles.tooltip)} style={{ right: '-15%' }}>
                    {'Phụ đề (c)'}
                </div>
                <RiClosedCaptioningLine />
            </div>
            <div className={clsx(styles.btn, styles.setting)}>
                <div className={clsx(styles.tooltip)} style={{ right: '-8%' }}>
                    {/* <MenuSetting
                    isActiveSetting={activeSetting}
                    items={dataSetting}
                    playSpeed={playSpeed}
                    handleChangeSpeed={handleChangeSpeed}
                /> */}
                </div>
                <MdSettings />
            </div>
            <div className={clsx(styles.btn, styles.movie)}>
                <div className={clsx(styles.tooltip)} style={{ right: '-118%' }}>
                    {'Trình phát thu nhỏ (i)'}
                </div>
                <CgToggleSquareOff />
            </div>
            <div className={clsx(styles.btn, styles.rectangle)}>
                <div className={clsx(styles.tooltip)} style={{ right: '-118%' }}>
                    {'Chế độ rạp chiếu phim (t)'}
                </div>
                <CgToggleSquare />
            </div>
            <div className={clsx(styles.btn, styles.tv)}>
                <FaChromecast />
            </div>
            <div className={clsx(styles.btn, styles.fullscreen)}>
                <div className={clsx(styles.tooltip)}>
                    {'Thát khỏi chế độ toàn màn hình (f)' || 'Toàn màn hình (f)'}
                </div>
                {<BiExitFullscreen /> || <BiFullscreen />}
            </div>
        </>
    );
}

export default ControlRight;
