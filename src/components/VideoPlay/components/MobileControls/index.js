import {
    BsFillPauseFill,
    BsFillPlayFill,
    BsFillSkipStartFill,
    BsFillSkipEndFill,
} from 'react-icons/bs';
import { MdSettings } from 'react-icons/md';

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './MobileControls.module.css';
function MobileControls({
    menuSetting,
    dataSetting,
    handleClickVideo,
    handleChangeDataSetting,
    handleNextTimeVideo,
    handlePrevTimeVideo,
}) {
    const [isShowSettings, setIsShowSettings] = useState(false);
    const [isShowControls, setIsShowControls] = useState(false);
    const timeoutRef = useRef(null);
    useEffect(() => {
        if (isShowSettings) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isShowSettings]);
    const handleTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        timeoutRef.current = setTimeout(() => {
            setIsShowControls(false);
        }, 3000);
    };
    const handleToggleVideo = (e) => {
        e.stopPropagation();
        handleClickVideo();
        handleTimeout();
    };
    const handleToggleControls = () => {
        handleTimeout();
        setIsShowControls(!isShowControls);
    };
    return (
        <>
            <div
                className={clsx(styles.overLay, {
                    [styles.show]: isShowSettings,
                })}
                onClick={() => setIsShowSettings(!isShowSettings)}
            >
                <div className={clsx(styles.modal)} onClick={(e) => e.stopPropagation()}>
                    <h3 className={clsx(styles.title)}>Cài đặt tính năng phát</h3>
                    <div className={clsx(styles.menu)}>
                        {menuSetting.map((item, index) => (
                            <div key={index} className={clsx(styles.group)}>
                                <label>{item.title}</label>
                                {item.children && (
                                    <select
                                        value={item.value}
                                        onChange={(e) => {
                                            handleChangeDataSetting(
                                                item.code,
                                                e.target.options[
                                                    e.target.options.selectedIndex
                                                ].getAttribute('data-value'),
                                                e.target.options[e.target.options.selectedIndex]
                                                    .value,
                                            );
                                        }}
                                    >
                                        {item.children.data.map((item2, index2) => (
                                            <option
                                                value={item2.title}
                                                data-value={item2.value}
                                                key={index2}
                                            >
                                                {item2.title}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        ))}
                        <Link to="#">Sao chép thông tin gỡ lỗi</Link>
                        <Link to="#">Thống kê chi tiết</Link>
                    </div>
                    <div className={clsx(styles.close)}>
                        <button onClick={() => setIsShowSettings(!isShowSettings)}>OK</button>
                    </div>
                </div>
            </div>
            <div className={clsx(styles.wrapper)} onClick={handleToggleControls}>
                <div className={clsx(styles.container, { [styles.show]: isShowControls })}>
                    <div
                        className={clsx(styles.btn, styles.setting)}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsShowSettings(!isShowSettings);
                        }}
                    >
                        <MdSettings size={30} color="#fff" />
                    </div>
                    <div
                        className={clsx(styles.btn)}
                        onClick={(e) => (
                            e.stopPropagation(), handlePrevTimeVideo(), handleTimeout()
                        )}
                    >
                        <BsFillSkipStartFill size={30} color="#fff" />
                    </div>
                    <div className={clsx(styles.btn, styles.play)} onClick={handleToggleVideo}>
                        {dataSetting.isPlay ? (
                            <BsFillPauseFill size={60} color="#fff" />
                        ) : (
                            <BsFillPlayFill size={60} color="#fff" />
                        )}
                    </div>
                    <div
                        className={clsx(styles.btn)}
                        onClick={(e) => (
                            e.stopPropagation(), handleNextTimeVideo(), handleTimeout()
                        )}
                    >
                        <BsFillSkipEndFill size={30} color="#fff" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default MobileControls;
