import { Flag, Share2 } from 'react-feather';

import clsx from 'clsx';
import Tooltip from '../../../../../components/Tooltip';
import useTimeConversion from '../../../../../hook/useTimeConversion';
import styles from './About.module.css';
import useNumberConversion from '../../../../../hook/useNumberConversion';
function About({ user }) {
    const { date, month, year } = useTimeConversion(user?.user_created_at, 'object');
    const totalViews = useNumberConversion(user.user_total_views, 'commas');
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.info)}>
                <div className={clsx(styles.des)}>
                    <span className={clsx(styles.title)}>Mô tả</span>
                    <div
                        className={clsx(styles.content)}
                        dangerouslySetInnerHTML={{
                            __html: user?.user_des,
                        }}
                    ></div>
                </div>
                <div className={clsx(styles.detail)}>
                    <span className={clsx(styles.title)}>Chi tiết</span>
                    <div className={clsx(styles.content)}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Đối với yêu cầu kinh doanh:</td>
                                    <td>
                                        <button>Xem địa chỉ Email</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Địa điểm:</td>
                                    <td>Việt Nam</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className={clsx(styles.statistical)}>
                <span className={clsx(styles.title)}>Thống kê</span>
                <div className={clsx(styles.content)}>
                    <ul>
                        <li>{`Đã tham gia ${date} Thg ${month}, ${year}`}</li>
                        {user.user_total_views > 0 && <li>{totalViews} lượt xem</li>}
                        <li>
                            <button>
                                <Tooltip
                                    content={'Báo cáo người dùng'}
                                    customStyle={{
                                        whiteSpace: 'nowrap',
                                        left: '50%',
                                        transform: 'translate(-50%,120%)',
                                    }}
                                />
                                <Flag size={22} strokeWidth={1} />
                            </button>
                            <button>
                                <Tooltip
                                    content={'Chia sẻ'}
                                    customStyle={{
                                        whiteSpace: 'nowrap',
                                        left: '50%',
                                        transform: 'translate(-50%,120%)',
                                    }}
                                />
                                <Share2 size={22} strokeWidth={1} />
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default About;
