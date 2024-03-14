import { SlEye } from 'react-icons/sl';
import { IoMdArrowDropdown } from 'react-icons/io';

import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Tooltip from '../components/Tooltip';
import formatDuration from '../../../../../hook/formatDuration';
import Actions from './Actions';
import useTimeConversion from '../../../../../hook/useTimeConversion';
import useNumberConversion from '../../../../../hook/useNumberConversion';
import styles from './Shorts.module.css';
function Item({ item, tab, handleClickBtnUpdate, handleClickBtnDelete }) {
    const { date, month, year } = useTimeConversion(item.video_created_at, 'object');
    const numberConversion = useNumberConversion;
    const like = +item.video_like;
    const dislike = +item.video_dislike;
    let precentLike = 0;
    if (like > 0 || dislike > 0) {
        precentLike = (like / (like + dislike)) * 100;
        precentLike = precentLike.toFixed(1);
    }
    return (
        <tr>
            <td data-textalign="center">
                <input type="checkbox" className={clsx(styles.checkbox)} />
            </td>
            <td>
                <div className={clsx(styles.main)}>
                    <Link
                        to={`/watch?category=${item.category_id}&id=${item.video_id}`}
                        className={clsx(styles.img)}
                    >
                        <div className={clsx(styles.aspectRatio)}>
                            <img src={item.video_poster} />
                            <p>{formatDuration(item.video_duration)}</p>
                        </div>
                    </Link>
                    <div className={clsx(styles.info)}>
                        <Actions
                            item={item}
                            handleClickBtnUpdate={handleClickBtnUpdate}
                            handleClickBtnDelete={handleClickBtnDelete}
                        />
                        <Link
                            to={`/watch?category=${item.category_id}&id=${item.video_id}`}
                            className={clsx(styles.title)}
                        >
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
            </td>
            <td>
                {tab === 'shorts' && (
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
                <p>
                    {date} thg {month}, {year}
                </p>
                <p>Đã xuất bản</p>
            </td>
            <td data-textalign="center">{numberConversion(item.video_views, 'compression')}</td>
            <td data-textalign="center">{numberConversion(item.video_cmt, 'compression')}</td>
            <td data-textalign="center">{precentLike}%</td>
        </tr>
    );
}

export default Item;
