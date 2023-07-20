import { HiOutlineFlag } from 'react-icons/hi';
import { RiShareForwardLine } from 'react-icons/ri';

import clsx from 'clsx';
import Tooltip from '../../../../../components/Tooltip';
import styles from './About.module.css';
function About() {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.info)}>
                <div className={clsx(styles.des)}>
                    <span className={clsx(styles.title)}>Mô tả</span>
                    <div className={clsx(styles.content)}>
                        <p>
                            Bụi Chill là kênh nhạc tổng hợp những bản nhạc hot nhất hiện nay. Cùng
                            nghe và thư giãn nhé cả nhà 🥰
                        </p>
                        <p style={{ marginTop: '20px' }}>
                            ✉ Hợp tác, quảng cáo, khiếu nại các vấn đề về bản quyền liên hệ chúng
                            tôi qua mail: contact@meemedia.net
                        </p>
                        <p style={{ marginTop: '15px' }}>© Bản quyền âm nhạc thuộc về Mee Media.</p>
                        <p>© Copyright by Mee Media </p>
                    </div>
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
                        <li>Đã tham gia 24 thg 7, 2020</li>
                        <li>69.559.815 lượt xem</li>
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
                                <HiOutlineFlag size={22} />
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
                                <RiShareForwardLine size={22} />
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default About;
