import { ChevronLeft, ChevronRight, ChevronsLeft } from 'react-feather';
import clsx from 'clsx';
import styles from './SeeAll.module.css';
import Tooltip from '../../../../../../components/Tooltip';
function Actions({ page, limit, totalPage, handleChangePage, handleChangeLimit }) {
    const handleCheckValue = (boolean, value) => {
        if (boolean) {
            handleChangePage(value);
        }
    };
    return (
        <div className={clsx(styles.actions)}>
            <div className={clsx(styles.action)}>
                <span>Số hàng trên mỗi trang</span>
                <select
                    value={limit}
                    onChange={(e) =>
                        handleChangeLimit(e.target.options[e.target.options.selectedIndex].value)
                    }
                >
                    <option value={10}>10</option>
                    <option value={30}>30</option>
                    <option value={50}>50</option>
                </select>
            </div>
            <div className={clsx(styles.action)}>
                <span>
                    Trang hiện tại {page}/{totalPage}
                </span>
            </div>
            <div
                className={clsx(styles.action, styles.btn, {
                    [styles.disable]: page === 1,
                })}
                onClick={() => handleCheckValue(page > 1, 1)}
            >
                <ChevronsLeft size={20} strokeWidth={1} />
                <Tooltip
                    data-class="tooltip"
                    content={'Trang đầu tiên'}
                    customStyle={{
                        bottom: 'calc(100% - 5px)',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        whiteSpace: 'nowrap',
                        fontSize: '1rem',
                        padding: '5px 7px',
                        fontWeight: '500',
                    }}
                />
            </div>
            <div
                className={clsx(styles.action, styles.btn, {
                    [styles.disable]: page <= 1,
                })}
                onClick={() => handleCheckValue(page > 1, page - 1)}
            >
                <ChevronLeft size={20} strokeWidth={1} />
                <Tooltip
                    data-class="tooltip"
                    content={'Trang tiếp theo'}
                    customStyle={{
                        bottom: 'calc(100% - 5px)',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        whiteSpace: 'nowrap',
                        fontSize: '1rem',
                        padding: '5px 7px',
                        fontWeight: '500',
                    }}
                />
            </div>
            <div
                className={clsx(styles.action, styles.btn, {
                    [styles.disable]: page >= totalPage,
                })}
                onClick={() => handleCheckValue(page < totalPage, page + 1)}
            >
                <ChevronRight size={20} strokeWidth={1} />
                <Tooltip
                    data-class="tooltip"
                    content={'Trang trước'}
                    customStyle={{
                        bottom: 'calc(100% - 5px)',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        whiteSpace: 'nowrap',
                        fontSize: '1rem',
                        padding: '5px 7px',
                        fontWeight: '500',
                    }}
                />
            </div>
        </div>
    );
}

export default Actions;
