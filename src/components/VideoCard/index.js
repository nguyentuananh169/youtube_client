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
import NoAvatar from '../NoAvatar';
import formatDuration from '../../hook/formatDuration';
import useTimeConversion from '../../hook/useTimeConversion';
import styles from './VideoCard.module.css';
import useNumberConversion from '../../hook/useNumberConversion';
function VideoCard({
    item,
    url = '',
    width,
    row = false,
    rowOwner = false,
    hidenOwner = false,
    hidenBtnIcon = false,
    hidenDotMenu = false,
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
    const timeAgo = useTimeConversion(item.video_created_at || item.vote_updated_at, 'ago');
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
            }, 1500);
        }
    };
    const handleChangeVolume = () => {
        setIsVolume(!isMuteVolume);
    };
    const views = useNumberConversion(item.video_views, 'compression');
    return (
        <div className={clsx(styles.videoCard, { [styles.row]: row, [styles.preview]: isPreview })}>
            <Link
                className={clsx(styles.link)}
                to={url || `/watch?category=${item.category_id}&id=${item.video_id}`}
            ></Link>
            <div
                className={clsx(styles.img, { [styles.preview]: isPlayVideo })}
                style={{ width }}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
            >
                <div className={clsx(styles.aspectRatio)}>
                    <Link
                        className={clsx(styles.link)}
                        to={url || `/watch?category=${item.category_id}&id=${item.video_id}`}
                    ></Link>
                    {isPlayVideo ? (
                        <VideoPlay
                            videoId={item.video_id}
                            videoLink={item.video_link}
                            isPreview
                            isMuteVoLumePreview={isMuteVolume}
                            autoPlay
                            muted={isMuteVolume}
                            handleChangeVolumePreview={handleChangeVolume}
                        />
                    ) : (
                        <>
                            <img src={item.video_poster} />
                            <div className={clsx(styles.duration)}>
                                {formatDuration(item.video_duration)}
                            </div>
                            {isPreview && (
                                <div className={clsx(styles.tooltip)}>
                                    Tiếp tục di chuột để phát
                                </div>
                            )}
                            {!isPreview && !hidenBtnIcon && (
                                <>
                                    <div className={clsx(styles.btnIcon)}>
                                        <div className={clsx(styles.icon)}>
                                            <RiHistoryFill size={20} color="#fff" />
                                            <p className={clsx(styles.text, styles.text1)}>
                                                Xem sau
                                            </p>
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
            </div>
            <div className={clsx(styles.details)}>
                {pathname === '/' && (
                    <div className={clsx(styles.channel)}>
                        <Link to={`/channel/${item.user_id}/home`}>
                            {item.user_avatar ? (
                                <img src={item.user_avatar} />
                            ) : (
                                <div className={clsx(styles.noAvatar)}>
                                    <NoAvatar userName={item.user_name} />
                                </div>
                            )}
                        </Link>
                    </div>
                )}
                <div className={clsx(styles.info)}>
                    <div className={clsx(styles.title)}>{item.video_title}</div>
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
                                        to={`/channel/${item.user_id}/home`}
                                    >
                                        {item.user_avatar ? (
                                            <img src={item.user_avatar} />
                                        ) : (
                                            <div className={clsx(styles.noAvatar)}>
                                                <NoAvatar userName={item.user_name} />
                                            </div>
                                        )}
                                    </Link>
                                )}
                                <Link
                                    to={`/channel/${item.user_id}/home`}
                                    className={clsx(styles.zIndex, styles.name)}
                                >
                                    <div className={clsx(styles.text)}>
                                        <span>{item.user_name}</span>
                                        <Tooltip
                                            content={item.user_name}
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
                            {views} lượt xem <BsDot /> {timeAgo}
                        </div>
                    </div>
                    {showDes && (
                        <div
                            className={clsx(styles.des)}
                            dangerouslySetInnerHTML={{ __html: item.video_des }}
                        ></div>
                    )}
                </div>
                {!hidenDotMenu && (
                    <div
                        ref={elementRef}
                        className={clsx(styles.dotMenu, { [styles.active]: isShow })}
                        onClick={handleShowMenu}
                    >
                        <DotMenu />
                        {isShow && <MenuFixed isDisableScroll={isShow} menulist={menuList} />}
                    </div>
                )}
            </div>
        </div>
    );
}

export default VideoCard;
