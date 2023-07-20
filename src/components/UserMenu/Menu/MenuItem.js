import { SlArrowRight } from 'react-icons/sl';
import { AiOutlineCheck } from 'react-icons/ai';

import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Menu.module.css';
function MenuItem({ item, active, isParent, onClick }) {
    const { pathname } = useLocation();
    let isHidden = false;
    const handleBlackList1 = (str) => {
        const strNew = str.slice(0, str.length - 2);
        const startsWith = pathname.startsWith(strNew);
        if (startsWith) {
            isHidden = true;
        }
    };
    const handleBlackList2 = (str) => {
        if (str === pathname) {
            isHidden = true;
        }
    };
    if (item.blackList) {
        const blackList = item.blackList;
        for (let i = 0; i < blackList.length; i++) {
            const str = blackList[i];
            const strToArray = str.split('/');
            if (strToArray[strToArray.length - 1] === '*') {
                handleBlackList1(str);
            } else {
                handleBlackList2(str);
            }
            if (isHidden) {
                break;
            }
        }
    }
    if (item.isBorder) {
        return (
            <div className={clsx(styles.border, { [styles.hidden]: isHidden })}>
                <p className={clsx(styles.line)}></p>
            </div>
        );
    } else if (item.isNote) {
        return (
            <div
                className={clsx(styles.note)}
                dangerouslySetInnerHTML={{ __html: item.text }}
            ></div>
        );
    } else {
        return (
            <li className={clsx({ [styles.hidden]: isHidden })}>
                {item.path ? (
                    <Link to={item.path} className={clsx(styles.content)}>
                        <span className={clsx(styles.icon)}>{item.icon}</span>
                        <span className={clsx(styles.text)}>{item.text}</span>
                    </Link>
                ) : (
                    <button className={clsx(styles.content)} onClick={onClick}>
                        <span className={clsx(styles.icon)}>
                            {item.icon || <AiOutlineCheck opacity={active ? 1 : 0} />}
                        </span>
                        <span className={clsx(styles.text)}>{`${item.text} ${
                            item.text2 ? item.text2 : ''
                        }`}</span>
                        {isParent && (
                            <span className={clsx(styles.icons)}>
                                <SlArrowRight />
                            </span>
                        )}
                    </button>
                )}
            </li>
        );
    }
}

export default MenuItem;
