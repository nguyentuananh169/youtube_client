import { BsDot } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Card from '../../components/Card';
import styles from './ChannelAnalytics.module.css';
function ChannelAnalytics() {
    return (
        <Card title={'Hiệu suất của video mới nhất'}>
            <div className={clsx(styles.subscribers)}>
                <p>Số người đăng ký hiện tại</p>
                <span>0</span>
            </div>
            <div className={clsx(styles.statistical)}>
                <strong>Tóm tắt</strong>
                <div className={clsx(styles.text, styles.title)}>
                    <span>28 ngày qua</span>
                </div>
                <div className={clsx(styles.text)}>
                    <span>Số lượt xem</span>
                    <span>0</span>
                </div>
                <div className={clsx(styles.text)}>
                    <span>Thời gian xem (giờ):</span>
                    <span>0,0</span>
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

export default ChannelAnalytics;
