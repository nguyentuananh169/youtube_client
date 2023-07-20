import { SlEye } from 'react-icons/sl';
import { IoMdArrowDropdown } from 'react-icons/io';

import clsx from 'clsx';
import styles from './Upload.module.css';
import { Link } from 'react-router-dom';
import Tooltip from '../components/Tooltip';
import Actions from './Actions';
function Item({ item, tab, handleClickBtnUpdate, handleClickBtnDelete }) {
    return (
        <tr>
            <td data-textalign="center">
                <input type="checkbox" className={clsx(styles.checkbox)} />
            </td>
            <td>
                <div className={clsx(styles.main)}>
                    <Link to={'#'} className={clsx(styles.img)}>
                        <img src={item.video_poster} />
                        <p>0:45</p>
                    </Link>
                    <div className={clsx(styles.info)}>
                        <Link to={'#'} className={clsx(styles.title)}>
                            {item.video_title}
                        </Link>
                        <p
                            className={clsx(styles.des, {
                                [styles.noData]: !item.video_des,
                            })}
                        >
                            {item.video_des ? (
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: item.video_des,
                                    }}
                                ></span>
                            ) : (
                                'Thêm mô tả'
                            )}
                        </p>
                    </div>
                </div>
                <Actions
                    item={item}
                    handleClickBtnUpdate={handleClickBtnUpdate}
                    handleClickBtnDelete={handleClickBtnDelete}
                />
            </td>
            <td>
                {tab === 'upload' && (
                    <Tooltip
                        headingText="Công khai"
                        bodyText="Mọi người đều có thể nhìn thấy video này"
                    />
                )}
                <div className={clsx(styles.visibility)}>
                    <p className={clsx(styles.icon, styles.eye)}>
                        <SlEye size={17} />
                    </p>
                    <span>Công khai</span>
                    <p className={clsx(styles.icon, styles.dropdown)}>
                        <IoMdArrowDropdown size={17} />
                    </p>
                </div>
            </td>
            <td>Không có</td>
            <td className={clsx(styles.time)}>
                <p>23 thg 5, 2023</p>
                <p>Đã xuất bản</p>
            </td>
            <td data-textalign="center">{item.video_views}</td>
            <td data-textalign="center">0</td>
            <td data-textalign="center">100%</td>
        </tr>
    );
}

export default Item;
