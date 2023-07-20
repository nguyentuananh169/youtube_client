import { GrDown } from 'react-icons/gr';
import { BsBell, BsBellSlash } from 'react-icons/bs';
import { HiOutlineBellAlert } from 'react-icons/hi2';
import { AiOutlineUserDelete } from 'react-icons/ai';

import clsx from 'clsx';
import MenuFixed from '../../../components/MenuFixed';
import useClickOutSide from '../../../hook/useClickOutSide';
import styles from './Channels.module.css';
function Actions() {
    const menu = [
        { icon: <HiOutlineBellAlert size={17} />, text: 'Tất cả' },
        { icon: <BsBell size={17} />, text: 'Dành riêng cho bạn' },
        { icon: <BsBellSlash size={17} />, text: 'Không thông báo' },
        { icon: <AiOutlineUserDelete size={17} />, text: 'Hủy đăng ký' },
    ];
    const [elementRef, isShow, setShow] = useClickOutSide();
    return (
        <div className={clsx(styles.actions)} ref={elementRef}>
            <button onClick={() => setShow(!isShow)}>
                <BsBell />
                <strong>Đã đăng ký</strong>
                <GrDown />
            </button>
            {isShow && <MenuFixed isDisableScroll menulist={menu} />}
        </div>
    );
}

export default Actions;
