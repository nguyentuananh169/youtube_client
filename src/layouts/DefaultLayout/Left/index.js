import clsx from 'clsx';
import { Link } from 'react-router-dom';

import {
    AiFillHome,
    AiOutlineHome,
    AiOutlinePlaySquare,
    AiFillPlaySquare,
    AiOutlineClockCircle,
    AiFillClockCircle,
    AiOutlineLike,
    AiFillLike,
    AiOutlineSetting,
} from 'react-icons/ai';
import {
    MdOutlinePlayLesson,
    MdPlayLesson,
    MdOutlineVideoLibrary,
    MdVideoLibrary,
    MdOutlineWhatshot,
    MdWhatshot,
    MdHelpOutline,
} from 'react-icons/md';
import { VscHistory } from 'react-icons/vsc';
import { FaHistory, FaPlayCircle } from 'react-icons/fa';
import {
    BsCollectionPlay,
    BsCollectionPlayFill,
    BsFlag,
    BsExclamationOctagon,
    BsFillPlayCircleFill,
    BsDisplayFill,
} from 'react-icons/bs';
import { BsFileMusic, BsFileMusicFill, BsTrophy, BsTrophyFill } from 'react-icons/bs';
import { RiGamepadLine, RiGamepadFill, RiNewspaperLine, RiNewspaperFill } from 'react-icons/ri';
import { ImPlay } from 'react-icons/im';

import HeaderMenu from '../Header/components/Menu';
import Menu from './Components/Menu';
import useStore from '../../../hook/useStore';
import { setIsToggleNavBar } from '../../../store/actions';
import styles from './Left.module.css';
function Left({ isMobile }) {
    const [state, dispatch] = useStore();
    const { isToggleNavbar } = state;
    const dataMenu = [
        {
            title: null,
            menu: [
                {
                    path: '/',
                    text: 'Trang chủ',
                    icon1: <AiOutlineHome />,
                    icon2: <AiFillHome />,
                    type: null,
                    isVisible: true,
                },
                {
                    path: '/shorts',
                    text: 'Shorts',
                    icon1: <MdOutlinePlayLesson />,
                    icon2: <MdPlayLesson />,
                    type: null,
                    isVisible: true,
                },
                {
                    path: '/subscriptions/videos',
                    text: 'Kênh đăng ký',
                    icon1: <BsCollectionPlay />,
                    icon2: <BsCollectionPlayFill />,
                    type: null,
                    isVisible: true,
                },
            ],
        },
        {
            title: null,
            menu: [
                {
                    path: '/library',
                    text: 'Thư viện',
                    icon1: <MdOutlineVideoLibrary />,
                    icon2: <MdVideoLibrary />,
                    type: null,
                    isVisible: true,
                },
                {
                    path: '/history',
                    text: 'Video đã xem',
                    icon1: <VscHistory />,
                    icon2: <FaHistory />,
                    type: null,
                },
                {
                    path: '/studio/videos/upload',
                    text: 'Video của bạn',
                    icon1: <AiOutlinePlaySquare />,
                    icon2: <AiFillPlaySquare />,
                    type: null,
                },
                {
                    path: '/watch-later',
                    text: 'Xem sau',
                    icon1: <AiOutlineClockCircle />,
                    icon2: <AiFillClockCircle />,
                    type: null,
                },
                {
                    path: '/liked',
                    text: 'Video đã thích',
                    icon1: <AiOutlineLike />,
                    icon2: <AiFillLike />,
                    type: null,
                },
            ],
        },
        {
            title: 'Kênh đăng ký',
            menu: [
                {
                    path: '/channel/@buichill/home',
                    text: 'Kênh tổng hợp 1 Kênh tổng hợp 1',
                    avatar: 'https://yt3.ggpht.com/z0B7y-Hr1sw4WxeNXki2JtD_22nIaFq8thBdKtCT6452c5RUypePAiC14KXBOdNyidM69Nxw=s68-c-k-c0x00ffffff-no-rj',
                    type: 'channel',
                    online: true,
                },
                {
                    path: '/channel/@buichill/home',
                    text: 'Kênh tổng hợp 2',
                    avatar: 'https://yt3.ggpht.com/ytc/AMLnZu-QZUU7IM-MN5vGExTxSfgp0Qt7aGnIpgNSFiaFyQ=s88-c-k-c0x00ffffff-no-rj',
                    type: 'channel',
                    online: true,
                },
                {
                    path: '/channel/@buichill/home',
                    text: 'Kênh tổng hợp 3',
                    avatar: 'https://yt3.ggpht.com/SB-871TnzGP0fFlcDY3JgtPjuZ6pwHts4FuvOHgOaOyjFxqQVUWaSZh8yhnZdFMxY9LUYOCO=s88-c-k-c0x00ffffff-no-rj',
                    type: 'channel',
                },
                {
                    path: '/channel/@buichill/home',
                    text: 'Kênh tổng hợp 4',
                    avatar: 'https://yt3.ggpht.com/ytc/AMLnZu81hTygRbAY4QFys1Og1LYH05rR9U0P4c80socz=s88-c-k-c0x00ffffff-no-rj',
                    type: 'channel',
                    online: true,
                },
                {
                    path: '/channel/@buichill/home',
                    text: 'Kênh tổng hợp 5',
                    avatar: 'https://yt3.ggpht.com/jZgTT-gREqn5Ar3bNyCsxRqge72RX8rbesRTsfAOcDBMMmopyOpN9bUwUTceyajaRCfSRzgYqA=s88-c-k-c0x00ffffff-no-rj',
                    type: 'channel',
                },
                {
                    path: '/channel/@buichill/home',
                    text: 'Xem qua các kênh',
                    icon: 'add_circle',
                    type: null,
                },
            ],
        },
        {
            title: 'Khám phá',
            menu: [
                {
                    path: '/search/trending',
                    text: 'Thịnh hành',
                    icon1: <MdOutlineWhatshot />,
                    icon2: <MdWhatshot />,
                    type: null,
                },
                {
                    path: '/search/music',
                    text: 'Âm nhạc',
                    icon1: <BsFileMusic />,
                    icon2: <BsFileMusicFill />,
                    type: null,
                },
                {
                    path: '/search/game',
                    text: 'Trò chơi',
                    icon1: <RiGamepadLine />,
                    icon2: <RiGamepadFill />,
                    type: null,
                },
                {
                    path: '/search/news',
                    text: 'Tin tức',
                    icon1: <RiNewspaperLine />,
                    icon2: <RiNewspaperFill />,
                    type: null,
                },
                {
                    path: '/search/sports',
                    text: 'Thể thao',
                    icon1: <BsTrophy />,
                    icon2: <BsTrophyFill />,
                    type: null,
                },
            ],
        },

        {
            title: 'Dịch vụ khác của YouTuBe',
            menu: [
                {
                    path: '/creator-studio',
                    text: 'Creator studio',
                    icon1: <FaPlayCircle />,
                    type: null,
                },
                {
                    path: '/youtube-music',
                    text: 'YouTuBe Music',
                    icon1: <BsFillPlayCircleFill />,
                    type: null,
                },
                {
                    path: '/youtube-kids',
                    text: 'YouTuBe Kids',
                    icon1: <ImPlay />,
                    type: null,
                },
                {
                    path: '/youtube-tv',
                    text: 'YouTuBe TV',
                    icon1: <BsDisplayFill />,
                    type: null,
                },
            ],
        },
        {
            title: null,
            menu: [
                {
                    path: '/setting',
                    text: 'Cài đặt',
                    icon1: <AiOutlineSetting />,
                    type: null,
                },
                {
                    path: '/report-history',
                    text: 'Nhật ký quảng cáo',
                    icon1: <BsFlag />,
                    type: null,
                },
                {
                    path: '/help',
                    text: 'Trợ giúp',
                    icon1: <MdHelpOutline />,
                    type: null,
                },
                {
                    path: '/feedback',
                    text: 'Gửi ý kiến phản hồi',
                    icon1: <BsExclamationOctagon />,
                    type: null,
                },
            ],
        },
    ];
    return (
        <>
            <div
                className={clsx(styles.overlay, {
                    [styles.toggle]: isToggleNavbar,
                    [styles.mobile]: isMobile,
                })}
                onClick={() => dispatch(setIsToggleNavBar())}
            ></div>
            <div
                className={clsx(styles.wrapper, {
                    [styles.toggle]: isToggleNavbar,
                    [styles.mobile]: isMobile,
                })}
            >
                <div className={clsx(styles.main)}>
                    <div className={clsx(styles.headerMenu, styles.show)}>
                        <HeaderMenu />
                    </div>
                </div>
                <div className={clsx(styles.menu)}>
                    <Menu isMobile={isMobile} data={dataMenu} isToggleNavbar={isToggleNavbar} />
                    <div
                        className={clsx(styles.footerMenu, {
                            [styles.hidden]: isToggleNavbar,
                        })}
                    >
                        <Link to={'/'}>Giới thiệu</Link>
                        <Link to={'/'}>Báo chí</Link>
                        <Link to={'/'}>Bản quyền</Link>
                        <Link to={'/'}>Liên hệ với chúng tôi</Link>
                        <Link to={'/'}>Người sáng tạo</Link>
                        <Link to={'/'}>Quảng cáo</Link>
                        <Link to={'/'}>Nhà phát triển</Link>
                    </div>
                    <div
                        className={clsx(styles.footerMenu, {
                            [styles.hidden]: isToggleNavbar,
                        })}
                    >
                        <Link to={'/'}>Điều khoản</Link>
                        <Link to={'/'}>Quyền riêng tư</Link>
                        <Link to={'/'}>Chính sách và an toàn</Link>
                        <Link to={'/'}>Cách YouTube hoạt động</Link>
                        <Link to={'/'}>Thử các tính năng mới</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Left;
