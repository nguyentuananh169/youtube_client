import { RiDeleteBin6Line } from 'react-icons/ri';

import clsx from 'clsx';
import DotMenu from '../../../components/DotMenu';
import MenuFixed from '../../../components/MenuFixed';
import useClickOutSide from '../../../hook/useClickOutSide';
import styles from './Community.module.css';
function Item() {
    const menu = [
        {
            icon: <RiDeleteBin6Line size={17} color="#0f0f0f" />,
            text: 'Xóa',
        },
    ];
    const [elementRef, isShow, setShow] = useClickOutSide();
    return (
        <div className={clsx(styles.item)}>
            <div className={clsx(styles.info)}>
                <div className={clsx(styles.text)}>
                    <span>
                        Đã thích <strong>bài đăng</strong> của Ni Tac - 冯提莫 Feng Timo
                    </span>
                </div>
                <div className={clsx(styles.time)}>
                    <span>2 năm trước</span>
                </div>
            </div>
            <div className={clsx(styles.dot)} ref={elementRef} onClick={() => setShow(!isShow)}>
                <DotMenu />
                {isShow && (
                    <MenuFixed
                        isDisableScroll
                        menulist={menu}
                        customStyle={{ width: '120px', minWidth: '120px' }}
                    />
                )}
            </div>
        </div>
    );
}

export default Item;
