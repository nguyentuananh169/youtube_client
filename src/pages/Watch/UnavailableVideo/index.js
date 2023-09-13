import clsx from 'clsx';
import img from '../../../assets/img/unavailable_video.png';
import styles from './UnavailableVideo.module.css';
import { Link } from 'react-router-dom';
function UnavailableVideo() {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.img)}>
                <img src={img} />
            </div>
            <div className={clsx(styles.title)}>
                <h3>Video không có sẵn</h3>
            </div>
            <div className={clsx(styles.text)}>
                <span>Người tải lên đã xóa video này</span>
            </div>
            <div className={clsx(styles.btn)}>
                <Link to={'/'}>Chuyển đến trang chủ</Link>
            </div>
        </div>
    );
}

export default UnavailableVideo;
