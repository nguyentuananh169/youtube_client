import { RiClosedCaptioningLine } from 'react-icons/ri';
import { MdSettings } from 'react-icons/md';
import { CgToggleSquare, CgToggleSquareOff } from 'react-icons/cg';
import { FaChromecast } from 'react-icons/fa';
import { BiExitFullscreen, BiFullscreen } from 'react-icons/bi';

import clsx from 'clsx';
import useClickOutSide from '../../../../hook/useClickOutSide';
import styles from './RightControls.module.css';
import Tooltip from '../../../Tooltip';
import MenuSetting from './MenuSetting';
function RightControls({
    dataSetting,
    isFullscreen,
    playSpeed,
    handleClickFullscreen,
    handleChangeSpeed,
}) {
    const [elementRef, isShow, setShow] = useClickOutSide(false);
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.btn, styles.caption, styles.tooltip)}>
                <Tooltip
                    content={'Phụ đề (c)'}
                    customStyle={{
                        left: '-40%',
                        whiteSpace: 'nowrap',
                        bottom: 'calc(100% + 10px)',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    }}
                />
                <RiClosedCaptioningLine />
            </div>
            <div
                ref={elementRef}
                className={clsx(styles.btn, styles.setting)}
                onClick={() => setShow(!isShow)}
            >
                <div
                    className={clsx(styles.menuSetting)}
                    style={{ right: '-8%' }}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    {isShow && (
                        <MenuSetting
                            items={dataSetting}
                            playSpeed={playSpeed}
                            handleChangeSpeed={handleChangeSpeed}
                        />
                    )}
                </div>
                <MdSettings />
            </div>
            <div className={clsx(styles.btn, styles.movie, styles.tooltip)}>
                <Tooltip
                    content={'Trình phát thu nhỏ (i)'}
                    customStyle={{
                        right: '-118%',
                        whiteSpace: 'nowrap',
                        bottom: 'calc(100% + 10px)',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    }}
                />
                <CgToggleSquareOff />
            </div>
            <div className={clsx(styles.btn, styles.rectangle, styles.tooltip)}>
                <Tooltip
                    content={'Chế độ rạp chiếu phim (t)'}
                    customStyle={{
                        right: '-118%',
                        whiteSpace: 'nowrap',
                        bottom: 'calc(100% + 10px)',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    }}
                />
                <CgToggleSquare />
            </div>
            <div className={clsx(styles.btn, styles.tv)}>
                <FaChromecast />
            </div>
            <div
                className={clsx(styles.btn, styles.fullscreen, styles.tooltip)}
                onClick={handleClickFullscreen}
            >
                <Tooltip
                    content="Thát khỏi chế độ toàn màn hình (f)"
                    customStyle={{
                        right: '0',
                        whiteSpace: 'nowrap',
                        bottom: 'calc(100% + 10px)',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    }}
                />
                {isFullscreen ? <BiExitFullscreen /> : <BiFullscreen />}
            </div>
        </div>
    );
}

export default RightControls;
