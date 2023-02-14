import { BsFilterLeft } from 'react-icons/bs';
import clsx from 'clsx';
import styles from './Filter.module.css';
import { useState } from 'react';
function Filter() {
    const [isShowMenu, setShowMenu] = useState(false);
    const [isActive, setActive] = useState(false);
    return (
        <div className={clsx(styles.filterContainer)}>
            <span className={clsx(styles.count)}>727 bình luận</span>
            <span
                className={clsx(styles.filter, { [styles.showMenu]: isShowMenu })}
                onClick={() => setShowMenu(!isShowMenu)}
            >
                <BsFilterLeft />
                <span style={{ fontWeight: '500' }}>Sắp xếp theo</span>
                <div className={clsx(styles.menu)}>
                    <ul>
                        <li
                            className={clsx({ [styles.active]: !isActive })}
                            onClick={() => setActive(!isActive)}
                        >
                            Bình luận hành đầu
                        </li>
                        <li
                            className={clsx({ [styles.active]: isActive })}
                            onClick={() => setActive(!isActive)}
                        >
                            Mới nhất xếp trước
                        </li>
                    </ul>
                </div>
            </span>
        </div>
    );
}

export default Filter;
