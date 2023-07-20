import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Card from '../../components/Card';
import styles from './VideoPerformance.module.css';
function VideoPerformance() {
    return (
        <Card title={'Hiệu suất của video mới nhất'}>
            <div className={clsx(styles.img)}>
                <img src="https://i9.ytimg.com/vi/HP0jFLsSP4Y/sddefault.jpg?sqp=CLTq1qMG-oaymwEmCIAFEOAD8quKqQMa8AEB-AH4CYAC0AWKAgwIABABGD4gYShlMA8=&rs=AOn4CLAGOs_oKbTzWm62U_rf3gjBociW-A" />
                <div className={clsx(styles.videoName)}>
                    <span>ĐỒNG HỒ ĐẾM NGƯỢC 30s MP4 Phan Linh</span>
                </div>
            </div>
            <div className={clsx(styles.statistical)}>
                <div className={clsx(styles.text, styles.title)}>
                    <span>6 ngày 17 giờ đầu tiên:</span>
                </div>
                <div className={clsx(styles.text)}>
                    <span>Số lượt xem</span>
                    <span>0</span>
                </div>
                <div className={clsx(styles.text)}>
                    <span>Tỷ lệ nhấp của số lượt hiển thị hình thu nhỏ</span>
                    <span>0%</span>
                </div>
                <div className={clsx(styles.text)}>
                    <span>Thời lượng xem trung bình</span>
                    <span>0:00</span>
                </div>
            </div>
            <div className={clsx(styles.linkBtn)}>
                <p>
                    <Link to={'#'}>Xem số liệu phân tích video</Link>
                </p>
                <p>
                    <Link to={'#'}>Xem bình luận (0)</Link>
                </p>
            </div>
        </Card>
    );
}

export default VideoPerformance;
