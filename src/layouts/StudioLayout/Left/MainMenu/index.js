import { HiOutlineSquares2X2 } from 'react-icons/hi2';
import { MdOutlineVideoLibrary, MdOutlineAttachMoney, MdOutlineLibraryMusic } from 'react-icons/md';
import { SiSimpleanalytics } from 'react-icons/si';
import { TfiCommentAlt } from 'react-icons/tfi';
import { RiClosedCaptioningLine } from 'react-icons/ri';
import { TbLicense } from 'react-icons/tb';
import { CiEdit } from 'react-icons/ci';
import { FiMoreVertical } from 'react-icons/fi';

import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './MainMenu.module.css';
import { setIsToggleNavBar2 } from '../../../../store/actions/toggleNavbar';
import { useDispatch, useSelector } from 'react-redux';
function MainMenu() {
    const menuList = [
        {
            path: '/studio',
            icon: <HiOutlineSquares2X2 fontSize={22} />,
            text: 'Trang tổng quan',
        },
        {
            path: '/studio/videos/upload',
            icon: <MdOutlineVideoLibrary fontSize={22} />,
            text: 'Nội dung',
        },
        {
            path: '/studio/analytics',
            icon: <SiSimpleanalytics fontSize={22} />,
            text: 'Số liệu phân tích',
        },
        {
            path: '/studio/comments',
            icon: <TfiCommentAlt fontSize={22} />,
            text: 'Bình luận',
            isHiddenOnMobile: true,
        },
        {
            path: '/studio/translations',
            icon: <RiClosedCaptioningLine fontSize={22} />,
            text: 'Phụ đề',
            isHiddenOnMobile: true,
        },
        {
            path: '/studio/copyright',
            icon: <TbLicense fontSize={22} />,
            text: 'Bản quyền',
            isHiddenOnMobile: true,
        },
        {
            path: '/studio/monetization',
            icon: <MdOutlineAttachMoney fontSize={22} />,
            text: 'Kiếm tiền',
        },
        {
            path: '/studio/editing',
            icon: <CiEdit fontSize={22} />,
            text: 'Tùy chỉnh',
            isHiddenOnMobile: true,
        },
        {
            path: '/studio/music',
            icon: <MdOutlineLibraryMusic fontSize={22} />,
            text: 'Thư viện âm thanh',
            isHiddenOnMobile: true,
        },
    ];
    const dispatch = useDispatch();
    const isToggleNavbar2 = useSelector((state) => state.toggleNavbar.isToggleNavbar2);
    return (
        <div className={clsx(styles.wrapper, { [styles.toggleNavbar]: isToggleNavbar2 })}>
            <ul>
                {menuList.map((item, index) => (
                    <li
                        key={index}
                        className={clsx({ [styles.hiddenOnMobile]: item.isHiddenOnMobile })}
                    >
                        <NavLink
                            to={item.path}
                            className={(nav) => clsx({ [styles.active]: nav.isActive })}
                            end
                        >
                            {item.icon}
                            <span>{item.text}</span>
                        </NavLink>
                    </li>
                ))}
                <li className={clsx(styles.more)} onClick={() => dispatch(setIsToggleNavBar2())}>
                    <button>
                        <FiMoreVertical size={22} />
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default MainMenu;
