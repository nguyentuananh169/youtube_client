import { BiUserCircle } from 'react-icons/bi';
import { CiYoutube } from 'react-icons/ci';
import { TbUsers } from 'react-icons/tb';
import { MdLogout, MdAttachMoney, MdOutlineLanguage } from 'react-icons/md';
import { RiShieldUserLine } from 'react-icons/ri';
import { BsMoon, BsKeyboard, BsExclamationSquare } from 'react-icons/bs';
import { TbLanguage } from 'react-icons/tb';
import { AiOutlineWarning, AiOutlineSetting, AiOutlineQuestionCircle } from 'react-icons/ai';
import { FiUserPlus } from 'react-icons/fi';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import Menu from './Menu';
import useClickOutSide from '../../hook/useClickOutSide';
import styles from './UserMenu.module.css';
import useStore from '../../hook/useStore';
import NoAvatar from '../NoAvatar';
function UserMenu() {
    const [state] = useStore();
    const { user } = state;
    const menuData = {
        deviceInterface: 'default',
        language: 'vn',
        restrictedMode: 'off',
        location: 'vn',
    };
    const menuList = [
        {
            icon: <BiUserCircle />,
            text: 'Kênh của bạn',
            path: `/channel/${user.user_id}/home`,
        },
        {
            icon: <CiYoutube />,
            text: 'YouTube',
            path: '/',
            blackList: [
                '/',
                '/channel/*',
                '/watch/*',
                '/post/*',
                '/search/*',
                '/library',
                '/history',
                '/subscriptions/*',
                '/watch-later',
                '/liked',
            ],
        },
        {
            icon: <CiYoutube />,
            text: 'YouTube Studio',
            path: '/studio',
            blackList: ['/studio/*'],
        },
        {
            icon: <TbUsers />,
            text: 'Chuyển đổi tài khoản',
            children: {
                title: 'Tài khoản',
                data: [
                    {
                        isNote: true,
                        text: `<p>${user.user_name}</p><p>${user.user_email}</p>`,
                    },
                    {
                        icon: <FiUserPlus />,
                        text: 'Thêm tài khoản',
                        path: '#',
                    },
                    {
                        icon: <MdLogout />,
                        text: 'Đăng xuất',
                        path: '/logout',
                    },
                ],
            },
        },
        {
            icon: <MdLogout />,
            text: 'Đăng xuất',
            path: '/logout',
        },
        {
            isBorder: true,
        },
        {
            icon: <MdAttachMoney />,
            text: 'Giao dịch mua và gói thành viên',
            path: '#',
            blackList: ['/studio/*'],
        },
        {
            icon: <RiShieldUserLine />,
            text: 'Dữ liệu của bạn trong YouTube',
            path: '#',
            blackList: ['/studio/*'],
        },
        {
            isBorder: true,
            blackList: ['/studio/*'],
        },
        {
            icon: <BsMoon />,
            text: 'Giao diện: ',
            text2: 'Giao diện thiết bị',
            children: {
                title: 'Giao diện',
                code: 'deviceInterface',
                data: [
                    {
                        isNote: true,
                        text: 'Tùy chọn cài đặt chỉ áp dụng cho trình duyệt này',
                    },
                    {
                        text: 'Giao diện thiết bị',
                        value: 'default',
                    },
                    {
                        text: 'Giao diện sáng',
                        value: 'bright',
                    },
                    {
                        text: 'Giao diện tối',
                        value: 'dark',
                    },
                ],
            },
        },
        {
            icon: <TbLanguage />,
            text: 'Ngôn ngữ: ',
            text2: 'Tiếng việt',
            children: {
                title: 'Chọn ngôn ngữ của bạn',
                code: 'language',
                data: [
                    {
                        text: 'Tiếng Việt',
                        value: 'vn',
                    },
                    {
                        text: 'Tiếng Anh',
                        value: 'en',
                    },
                    {
                        text: 'Tiếng Hàn',
                        value: 'ko',
                    },
                    {
                        text: 'Tiếng Nhật',
                        value: 'ja',
                    },
                ],
            },
            blackList: ['/studio/*'],
        },
        {
            icon: <AiOutlineWarning />,
            text: 'Chế độ hạn chế: Đã ',
            text2: 'tắt',
            children: {
                title: 'Chế độ hạn chế',
                code: 'restrictedMode',
                data: [
                    {
                        text: 'Bật',
                        value: 'on',
                    },
                    {
                        text: 'Tắt',
                        value: 'off',
                    },
                ],
            },
            blackList: ['/studio/*'],
        },
        {
            icon: <MdOutlineLanguage />,
            text: 'Địa điểm: ',
            text2: 'Việt Nam',
            children: {
                title: 'Chọn vị trí của bạn',
                code: 'location',
                data: [
                    {
                        text: 'Việt Nam',
                        value: 'vn',
                    },
                    {
                        text: 'Hàn Quốc',
                        value: 'ko',
                    },
                    {
                        text: 'Nhật Bản',
                        value: 'ja',
                    },
                ],
            },
            blackList: ['/studio/*'],
        },
        {
            icon: <BsKeyboard />,
            text: 'Phím tắt',
            path: '#',
            blackList: ['/studio/*'],
        },
        {
            isBorder: true,
            blackList: ['/studio/*'],
        },
        {
            icon: <AiOutlineSetting />,
            text: 'Cài đặt',
            path: '#',
            blackList: ['/studio/*'],
        },
        {
            isBorder: true,
            blackList: ['/studio/*'],
        },
        {
            icon: <AiOutlineQuestionCircle />,
            text: 'Trợ giúp',
            path: '#',
            blackList: ['/studio/*'],
        },
        {
            icon: <BsExclamationSquare />,
            text: 'Gửi ý kiến phản hồi',
            path: '#',
        },
    ];
    const [menu, setMenu] = useState(menuList);
    const [data, setData] = useState(menuData);
    const [elementRef, isShow, setShow] = useClickOutSide();
    const location = useLocation();
    useEffect(() => {
        setShow(false);
    }, [location.pathname]);
    useEffect(() => {
        if (isShow) {
            const sY = window.pageYOffset || document.documentElement.scrollTop;
            const sX = window.pageXOffset || document.documentElement.scrollLeft;
            const handleDisableScroll = () => {
                window.scrollTo(sX, sY);
            };
            window.addEventListener('scroll', handleDisableScroll);
            return () => {
                window.removeEventListener('scroll', handleDisableScroll);
            };
        }
    }, [isShow]);
    const handleChangeMenu = (code, value, text) => {
        const index = menu.findIndex((item) => item.children && item.children.code === code);
        if (index >= 0) {
            const newMenu = menu;
            newMenu[index].text2 = text;
            setMenu(newMenu);
        }
        setData({ ...data, [code]: value });
    };
    return (
        <div ref={elementRef} className={clsx(styles.user)} onClick={() => setShow(!isShow)}>
            {user.user_avatar ? (
                <img src={user.user_avatar} />
            ) : (
                <NoAvatar
                    userName={user.user_name}
                    customStyles={{ width: '32px', cursor: 'pointer', fontSize: '1.7rem' }}
                />
            )}
            {isShow && (
                <Menu
                    user={user}
                    menu={menu}
                    data={data}
                    handleChangeMenu={handleChangeMenu}
                    setShow={setShow}
                />
            )}
        </div>
    );
}

export default UserMenu;
