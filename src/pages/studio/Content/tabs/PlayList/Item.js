import { SlEye } from 'react-icons/sl';
import { IoMdArrowDropdown } from 'react-icons/io';
import { RiPlayList2Line } from 'react-icons/ri';

import clsx from 'clsx';
import Tooltip from '../components/Tooltip';
import Actions from './Actions';
import styles from './PlayList.module.css';
import noThumbnail from '../../../../../assets/img/no_thumbnail.jpg';
function Item({ item, tab, handleClickBtnUpdate, handleClickBtnDelete, handleClickBtnShow }) {
    return (
        <tr>
            <td>
                <div className={clsx(styles.main)}>
                    <div
                        className={clsx(styles.img)}
                        onClick={() => handleClickBtnShow(item.playlist_id)}
                    >
                        <img src={item.video_poster || noThumbnail} />
                        <label>
                            <span>{item.total_video}</span>
                            <RiPlayList2Line color="#f2f2f2" size={17} />
                        </label>
                    </div>
                    <div className={clsx(styles.info)}>
                        <span
                            className={clsx(styles.title)}
                            onClick={() => handleClickBtnUpdate(item)}
                        >
                            {item.playlist_name}
                        </span>
                        <p
                            className={clsx(styles.des, {
                                [styles.noData]: !item.playlist_des,
                            })}
                        >
                            {item.playlist_des ? <span>{item.playlist_des}</span> : 'Thêm mô tả'}
                        </p>
                    </div>
                </div>
                <Actions
                    item={item}
                    handleClickBtnUpdate={handleClickBtnUpdate}
                    handleClickBtnDelete={handleClickBtnDelete}
                    handleClickBtnShow={handleClickBtnShow}
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
            <td>10 thg 8, 2023</td>
            <td>{item.total_video}</td>
        </tr>
    );
}

export default Item;
