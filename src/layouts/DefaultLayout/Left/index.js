import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

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

import { useLocation } from 'react-router-dom';
import HeaderMenu from '../Header/components/Menu';
import Menu from './Components/Menu';
import { addSubscriptionList } from '../../../store/actions/subscription';
import { setIsToggleNavBar } from '../../../store/actions/toggleNavbar';
import Login from '../Header/components/Actions/Login';
import subscriptionApi from '../../../api/subscriptionApi';
import styles from './Left.module.css';

function Left({ isMobile }) {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const isToggleNavbar = useSelector((state) => state.toggleNavbar.isToggleNavbar);
    const isLogin = useSelector((state) => state.auth.isLogin);
    const user = useSelector((state) => state.auth.user);
    const subscriptionList = useSelector((state) => state.subscription);
    const initMenuData = [
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
                    path: '/subscriptions',
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
                    isHidden: !isLogin || !user?.user_id,
                },
                {
                    path: '/watch-later',
                    text: 'Xem sau',
                    icon1: <AiOutlineClockCircle />,
                    icon2: <AiFillClockCircle />,
                    type: null,
                    isHidden: !isLogin || !user?.user_id,
                },
                {
                    path: '/liked',
                    text: 'Video đã thích',
                    icon1: <AiOutlineLike />,
                    icon2: <AiFillLike />,
                    type: null,
                    isHidden: !isLogin || !user?.user_id,
                },
            ],
        },
        {
            title2: 'Hãy đăng nhập để thích video, bình luận và đăng ký kênh',
            isHidden: isLogin && user?.user_id,
            menu: [
                {
                    component: <Login />,
                },
            ],
            dataClass: 'login',
        },
        {
            title: 'Kênh đăng ký',
            isHidden: !isLogin || !user?.user_id,
            menu: [],
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
                    icon1: <FaPlayCircle color="#ff0000" />,
                    type: null,
                },
                {
                    path: '/youtube-music',
                    text: 'YouTuBe Music',
                    icon1: <BsFillPlayCircleFill color="#ff0000" />,
                    type: null,
                },
                {
                    path: '/youtube-kids',
                    text: 'YouTuBe Kids',
                    icon1: <ImPlay color="#ff0000" />,
                    type: null,
                },
                {
                    path: '/youtube-tv',
                    text: 'YouTuBe TV',
                    icon1: <BsDisplayFill color="#ff0000" />,
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
    const [menuData, setMenuData] = useState(initMenuData);

    useEffect(() => {
        if (isLogin && user?.user_id) {
            const fetchSubscribed = async () => {
                const formData = {
                    _limit: 5,
                };
                const response = await subscriptionApi.showSubscribed(formData);
                const subList = response.list;
                dispatch(addSubscriptionList(subList));
            };
            fetchSubscribed();
        }
    }, []);
    useEffect(() => {
        const subList = subscriptionList.map((item) => ({
            path: `/channel/${item.user_id}/home`,
            text: item.user_name,
            avatar: item.user_avatar,
            type: 'channel',
            online: true,
        }));
        const newData = [...menuData];
        newData[3].menu = subList;
        setMenuData(newData);
    }, [subscriptionList]);
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
                    [styles.pageShorts]: pathname === '/shorts',
                })}
            >
                <div className={clsx(styles.main)}>
                    <div className={clsx(styles.headerMenu, styles.show)}>
                        <HeaderMenu />
                    </div>
                </div>
                <div className={clsx(styles.menu)}>
                    <Menu isMobile={isMobile} data={menuData} isToggleNavbar={isToggleNavbar} />
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
