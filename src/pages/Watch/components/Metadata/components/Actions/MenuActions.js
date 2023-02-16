import { TfiDownload } from 'react-icons/tfi';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsSave } from 'react-icons/bs';
import { MdOutlinedFlag } from 'react-icons/md';
import clsx from 'clsx';
import styles from './Actions.module.css';
function MenuActions() {
    return (
        <div className={clsx(styles.menuActions)}>
            <ul>
                <li>
                    <TfiDownload />
                    <span>Tải xuống</span>
                </li>
                <li>
                    <AiOutlineHeart />
                    <span>Cảm ơn</span>
                </li>
                <li>
                    <BsSave />
                    <span>Lưu</span>
                </li>
                <li>
                    <MdOutlinedFlag />
                    <span>Báo cáo vi phạm</span>
                </li>
            </ul>
        </div>
    );
}

export default MenuActions;
