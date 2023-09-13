import { BsChevronBarLeft, BsChevronLeft, BsChevronBarRight, BsChevronRight } from 'react-icons/bs';

import clsx from 'clsx';
import styles from './Upload.module.css';
import Tooltip from '../../../../../components/Tooltip';
function TableBottom({ params, handleChangeLimit, handleChangePage }) {
    const handleCheckValue = (boolean, value) => {
        if (boolean) {
            handleChangePage(value);
        }
    };
    return (
        <tr data-class="no-hover">
            <td colSpan={8}>
                <div className={clsx(styles.tableBottom)}>
                    <div className={clsx(styles.item)}>Số hàng trên mỗi trang:</div>
                    <div className={clsx(styles.item, styles.select)}>
                        <select
                            value={params.limit}
                            onChange={(e) =>
                                handleChangeLimit(
                                    e.target.options[e.target.options.selectedIndex].value,
                                )
                            }
                        >
                            <option value={10}>10</option>
                            <option value={30}>30</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                    <div className={clsx(styles.item)}>Trang hiện tại:</div>
                    <div
                        className={clsx(styles.item)}
                    >{`${params.page} - ${params.page}/${params.totalPage}`}</div>
                    <div className={clsx(styles.item)}>
                        <div
                            className={clsx(styles.icon, { [styles.disable]: params.page === 1 })}
                            onClick={() => handleCheckValue(params.page !== 1, 1)}
                        >
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
                        <div
                            className={clsx(styles.icon, { [styles.disable]: params.page <= 1 })}
                            onClick={() => handleCheckValue(params.page > 1, params.page - 1)}
                        >
                            <BsChevronLeft size={15} />
                            <Tooltip
                                content={'Trang trước'}
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
                        <div
                            className={clsx(styles.icon, {
                                [styles.disable]: params.page >= params.totalPage,
                            })}
                            onClick={() =>
                                handleCheckValue(params.page < params.totalPage, params.page + 1)
                            }
                        >
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
                        <div
                            className={clsx(styles.icon, {
                                [styles.disable]: params.page >= params.totalPage,
                            })}
                            onClick={() =>
                                handleCheckValue(params.page !== params.totalPage, params.totalPage)
                            }
                        >
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
