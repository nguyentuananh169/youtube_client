import { BsSave, BsClock, BsDownload } from 'react-icons/bs';
import { HiOutlineBan, HiOutlineFlag } from 'react-icons/hi';
import clsx from 'clsx';
import styles from './ItemList.module.css';
function MenuDot() {
    return (
        <ul className={clsx(styles.menu)} onClick={(e) => e.stopPropagation()}>
            <li>
                <BsSave />
                <span>Thêm vào danh sách chờ</span>
            </li>
            <li>
                <BsClock />
                <span>Lưu vào danh sách xem sau</span>
            </li>
            <li>
                <BsDownload />
                <span>Tải xuống</span>
            </li>
            <li className={clsx(styles.mgt)}>
                <HiOutlineBan />
                <span>Không quan tâm</span>
            </li>
            <li>
                <HiOutlineBan />
                <span>Không đề xuất kênh này</span>
            </li>
            <li>
                <HiOutlineFlag />
                <span>Báo cáo vi phạm</span>
            </li>
        </ul>
    );
}

export default MenuDot;
