import { BsSave, BsClock, BsDownload, BsDot, BsCheckCircleFill } from 'react-icons/bs';
import { HiOutlineBan, HiOutlineFlag } from 'react-icons/hi';
import { RiHistoryFill, RiPlayList2Fill } from 'react-icons/ri';

import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import useClickOutSide from '../../hook/useClickOutSide';
import VideoPlay from '../VideoPlay';
import Tooltip from '../Tooltip';
import MenuFixed from '../MenuFixed';
import DotMenu from '../DotMenu';
import styles from './VideoCard.module.css';
function VideoCard({
    width,
    row = false,
    rowOwner = false,
    hidenOwner = false,
    hidenBtnIcon = false,
    isPreview = false,
    showDes = false,
}) {
    const menuList = [
        {
            icon: <BsSave size={17} />,
            text: 'Thêm vào danh sách chờ',
        },
        {
            icon: <BsClock size={17} />,
            text: 'Lưu vào danh sách xem sau',
        },
        {
            icon: <BsDownload size={17} />,
            text: 'Tải xuống',
        },
        {
            icon: <HiOutlineBan size={17} />,
            text: 'Không quan tâm',
            customStyle: {
                borderTop: '1px solid #e6e6e6',
            },
        },
        {
            icon: <HiOutlineBan size={17} />,
            text: 'Không đề xuất kênh này',
        },
        {
            icon: <HiOutlineFlag size={17} />,
            text: 'Báo cáo vi phạm',
        },
    ];
    const [isPlayVideo, setPlayVideo] = useState(false);
    const [isMuteVolume, setIsVolume] = useState(true);
    const [elementRef, isShow, setShow] = useClickOutSide();
    const { pathname } = useLocation();
    const timeOutRef = useRef(null);
    const handleShowMenu = (e) => {
        e.preventDefault();
        setShow(!isShow);
    };
    const handlePlay = () => {
        setPlayVideo(true);
    };
    const handleMouseLeave = () => {
        if (isPreview) {
            if (timeOutRef.current) {
                clearTimeout(timeOutRef.current);
                setPlayVideo(false);
            }
        }
    };
    const handleMouseOver = () => {
        if (isPreview) {
            if (timeOutRef.current) {
                clearTimeout(timeOutRef.current);
            }
            timeOutRef.current = setTimeout(() => {
                handlePlay();
            }, 2000);
        }
    };
    const handleChangeVolume = () => {
        setIsVolume(!isMuteVolume);
    };
    return (
        <div className={clsx(styles.videoCard, { [styles.row]: row, [styles.preview]: isPreview })}>
            <Link className={clsx(styles.link)} to="/watch/22"></Link>
            <div
                className={clsx(styles.img, { [styles.preview]: isPlayVideo })}
                style={{ width }}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
            >
                <Link className={clsx(styles.link)} to="/watch/22"></Link>
                {isPlayVideo ? (
                    <VideoPlay
                        isPreview
                        isMuteVoLumePreview={isMuteVolume}
                        autoPlay
                        muted={isMuteVolume}
                        handleChangeVolumePreview={handleChangeVolume}
                    />
                ) : (
                    <>
                        <img src="https://tse4.mm.bing.net/th?id=OIP.oDuqR6J22VPG70LDIHufZwHaEK&pid=Api&P=0&h=180" />
                        <div className={clsx(styles.duration)}>11:00:00</div>
                        {isPreview && (
                            <div className={clsx(styles.tooltip)}>Tiếp tục di chuột để phát</div>
                        )}
                        {!isPreview && !hidenBtnIcon && (
                            <>
                                <div className={clsx(styles.btnIcon)}>
                                    <div className={clsx(styles.icon)}>
                                        <RiHistoryFill size={20} color="#fff" />
                                        <p className={clsx(styles.text, styles.text1)}>Xem sau</p>
                                    </div>
                                </div>
                                <div className={clsx(styles.btnIcon)}>
                                    <div className={clsx(styles.icon)}>
                                        <RiPlayList2Fill size={20} color="#fff" />
                                        <p className={clsx(styles.text, styles.text2)}>
                                            Thêm vào danh sách chờ
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
            <div className={clsx(styles.details)}>
                {pathname === '/' && (
                    <div className={clsx(styles.channel)}>
                        <Link to="/channel/@nguyentuananh/home">
                            <img src="https://yt3.ggpht.com/sRhKv0BM8jaNEWohgVcxv4bengflseeCPUtzINiGe_grG2CPZXIriR5ytxvZlxOVv8LEgV9-J_M=s88-c-k-c0x00ffffff-no-rj" />
                        </Link>
                    </div>
                )}
                <div className={clsx(styles.info)}>
                    <div className={clsx(styles.title)}>
                        Top 20 Bài Hát Hot Nhất Trên TikTok 2023 💘 Nhạc Remix Hot Trend Được Sử
                        Dụng Nhiều Nhất TikTok 2023
                    </div>
                    <div
                        className={clsx(styles.ownerContainer, {
                            [styles.location]: pathname.includes('/search'),
                            [styles.row]: rowOwner,
                        })}
                    >
                        {!hidenOwner && (
                            <div className={clsx(styles.owner)}>
                                {pathname.includes('/search') && (
                                    <Link
                                        className={clsx(styles.zIndex)}
                                        to="/channel/@nguyentuananh"
                                    >
                                        <img src="https://yt3.ggpht.com/2PdJLlJXOqRV-41XvN6fS-wdAlkFmf69bjbebYZstYo2pBBOBTNVXhw-GqPtb9cfEMowsDXctA=s68-c-k-c0x00ffffff-no-rj" />
                                    </Link>
                                )}
                                <Link
                                    to="/channel/@nguyentuananh/home"
                                    className={clsx(styles.zIndex, styles.name)}
                                >
                                    <div className={clsx(styles.text)}>
                                        <span>Ni Tac - 冯提莫 Feng Timo</span>
                                        <Tooltip
                                            content="Nguyễn Tuấn Anh"
                                            customStyle={{
                                                left: '0',
                                                bottom: 'calc(100% + 28px)',
                                                whiteSpace: 'nowrap',
                                            }}
                                        />
                                    </div>
                                    <div className={clsx(styles.icon)}>
                                        <Tooltip
                                            content="Đã xác minh"
                                            customStyle={{
                                                left: '50%',
                                                bottom: 'calc(100% + 10px)',
                                                transform: 'translate(-50%, -50%)',
                                                whiteSpace: 'nowrap',
                                            }}
                                        />
                                        <BsCheckCircleFill />
                                    </div>
                                </Link>
                            </div>
                        )}
                        <div className={clsx(styles.time)}>
                            502 N lượt xem <BsDot /> 3 năm trước
                        </div>
                    </div>
                    {showDes && (
                        <div className={clsx(styles.des)}>
                            Đăng kí kênh A Pháo TV tại đây: http://pesc.pw/FAUWS ▻ Đăng kí kênh
                            Giàng A Pháo tại đây: http://pesc.pw/DZK9K ▻ Facebook
                        </div>
                    )}
                </div>

                <div
                    ref={elementRef}
                    className={clsx(styles.dotMenu, { [styles.active]: isShow })}
                    onClick={handleShowMenu}
                >
                    <DotMenu />
                    {isShow && <MenuFixed isDisableScroll={isShow} menulist={menuList} />}
                </div>
            </div>
        </div>
    );
}

export default VideoCard;
