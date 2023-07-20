import { MdOutlineOpenInNew } from 'react-icons/md';

import clsx from 'clsx';
import styles from './Bottom.module.css';
import { Link } from 'react-router-dom';
function Bottom() {
    return (
        <div className={clsx(styles.wrapper)}>
            <Link to={'#'}>
                Điều khoản sử dụng <MdOutlineOpenInNew size={14} />
            </Link>
            <Link to={'#'}>
                Chính sách quyền riêng tư <MdOutlineOpenInNew size={14} />
            </Link>
            <Link to={'#'}>
                Chính sách và An toàn <MdOutlineOpenInNew size={14} />
            </Link>
        </div>
    );
}

export default Bottom;
