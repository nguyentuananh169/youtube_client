import { BsFilterLeft } from 'react-icons/bs';
import clsx from 'clsx';
import styles from './Filter.module.css';
import { useState } from 'react';
import useClickOutSide from '../../../../../../hook/useClickOutSide';
function Filter({ totalComment, handleChangeTypeFilter }) {
    const [type, setType] = useState('DESC');
    const [elementRef, isShow, setShow] = useClickOutSide();
    const handleSetType = (value) => {
        setType(value);
        handleChangeTypeFilter(value);
    };
    return (
        <div className={clsx(styles.filterContainer)}>
            <span className={clsx(styles.count)}>{totalComment} bình luận</span>
            <span
                ref={elementRef}
                className={clsx(styles.filter, { [styles.showMenu]: isShow })}
                onClick={() => setShow(!isShow)}
            >
                <BsFilterLeft />
                <span style={{ fontWeight: '500' }}>Sắp xếp theo</span>
                <div className={clsx(styles.menu)}>
                    <ul>
                        <li
                            className={clsx({ [styles.active]: type === 'DESC' })}
                            onClick={() => handleSetType('DESC')}
                        >
                            Mới nhất xếp trước
                        </li>
                        <li
                            className={clsx({ [styles.active]: type === 'ASC' })}
                            onClick={() => handleSetType('ASC')}
                        >
                            Cũ nhất xếp trước
                        </li>
                    </ul>
                </div>
            </span>
        </div>
    );
}

export default Filter;
