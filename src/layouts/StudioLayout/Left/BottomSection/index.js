import { SlSettings } from 'react-icons/sl';
import { MdOutlineFeedback } from 'react-icons/md';

import { useSelector } from 'react-redux';
import clsx from 'clsx';
import styles from './BottomSection.module.css';
function BottomSection() {
    const isToggleNavbar2 = useSelector((state) => state.toggleNavbar.isToggleNavbar2);
    const menuList = [
        {
            icon: <SlSettings fontSize="20" color="#909090" />,
            text: 'Cài đặt',
        },
        {
            icon: <MdOutlineFeedback fontSize="20" color="#909090" />,
            text: 'Gửi ý kiến phản hồi',
        },
    ];

    return (
        <div className={clsx(styles.wrapper, { [styles.toggleNavbar]: isToggleNavbar2 })}>
            <ul>
                {menuList.map((item, index) => (
                    <li key={index}>
                        {item.icon}
                        <span>{item.text}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BottomSection;
