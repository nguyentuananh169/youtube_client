import { AiFillCaretDown } from 'react-icons/ai';
import { BsChevronBarLeft, BsChevronLeft, BsChevronBarRight, BsChevronRight } from 'react-icons/bs';

import clsx from 'clsx';
import styles from './Upload.module.css';
import Tooltip from '../../../../../components/Tooltip';
function TableBottom() {
    return (
        <tr data-class="no-hover">
            <td colSpan={8}>
                <div className={clsx(styles.tableBottom)}>
                    <div className={clsx(styles.item)}>Số hàng trên mỗi trang:</div>
                    <div className={clsx(styles.item, styles.select)}>
                        <span>30</span>
                        <div className={clsx(styles.icon)}>
                            <AiFillCaretDown size={15} />
                        </div>
                    </div>
                    <div className={clsx(styles.item)}>1 - 2/2</div>
                    <div className={clsx(styles.item)}>
                        <div className={clsx(styles.icon)}>
                            <BsChevronBarLeft size={17} />
                            <Tooltip
                                content={'Trang đầu tiên'}
                                customStyle={{
                                    bottom: '100%',
                                    left: '50%',
                                    transform: 'translate(-50%,-50%)',
                                    whiteSpace: 'nowrap',
                                    fontSize: '1.1rem',
                                    padding: '5px 7px',
                                }}
                            />
                        </div>
                    </div>
                    <div className={clsx(styles.item)}>
                        <div className={clsx(styles.icon)}>
                            <BsChevronLeft size={15} />
                            <Tooltip
                                content={'Trang đầu trước'}
                                customStyle={{
                                    bottom: '100%',
                                    left: '50%',
                                    transform: 'translate(-50%,-50%)',
                                    whiteSpace: 'nowrap',
                                    fontSize: '1.1rem',
                                    padding: '5px 7px',
                                }}
                            />
                        </div>
                    </div>
                    <div className={clsx(styles.item)}>
                        <div className={clsx(styles.icon)}>
                            <BsChevronRight size={15} />
                            <Tooltip
                                content={'Trang tiếp theo'}
                                customStyle={{
                                    bottom: '100%',
                                    left: '50%',
                                    transform: 'translate(-50%,-50%)',
                                    whiteSpace: 'nowrap',
                                    fontSize: '1.1rem',
                                    padding: '5px 7px',
                                }}
                            />
                        </div>
                    </div>
                    <div className={clsx(styles.item)}>
                        <div className={clsx(styles.icon)}>
                            <BsChevronBarRight size={17} />
                            <Tooltip
                                content={'Trang cuối'}
                                customStyle={{
                                    bottom: '100%',
                                    left: '50%',
                                    transform: 'translate(-50%,-50%)',
                                    whiteSpace: 'nowrap',
                                    fontSize: '1.1rem',
                                    padding: '5px 7px',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    );
}

export default TableBottom;
