import { BsDot } from 'react-icons/bs';

import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Card from '../../../components/Card';
import styles from './Channel.module.css';
function Channel({ user, isLoading }) {
    return (
        <Card title={'Số liệu phân tích về kênh'}>
            <div className={clsx(styles.subscribers)}>
                <p>Số người đăng ký hiện tại</p>
                <span>{isLoading ? '—' : user.user_total_subscribe}</span>
            </div>
            <div className={clsx(styles.statistical)}>
                <strong>Tóm tắt</strong>
                <div className={clsx(styles.text, styles.title)}>
                    <span>28 ngày qua</span>
                </div>
                <div className={clsx(styles.text)}>
                    <span>Số lượt xem</span>
                    <span>—</span>
                </div>
                <div className={clsx(styles.text)}>
                    <span>Thời gian xem (giờ):</span>
                    <span>—</span>
                </div>
            </div>
            <div className={clsx(styles.top)}>
                <strong>Video hàng đầu</strong>
                <p>
                    48 giờ qua <BsDot size={10} /> số lượt xem
                </p>
            </div>
            <div className={clsx(styles.linkBtn)}>
                <Link to={'#'}>Chuyển đến số liệu phân tích</Link>
            </div>
        </Card>
    );
}

export default Channel;
