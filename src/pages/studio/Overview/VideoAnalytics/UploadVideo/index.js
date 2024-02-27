import { Link } from 'react-router-dom';
import clsx from 'clsx';
import imgv1 from '../../../../../assets/img/no_content_v1.png';
import styles from './UploadVideo.module.css';
function UploadVideo() {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.container)}>
                <div className={clsx(styles.img)}>
                    <img src={imgv1} />
                </div>
                <div className={clsx(styles.text)}>
                    <p>Bạn có muốn xem các chỉ số cho video gần đây của mình không?</p>
                    <p>Hãy đăng tải và xuất bản một video để bắt đầu.</p>
                </div>
                <div className={clsx(styles.btn)}>
                    <Link to={'/studio/videos/upload?type=upload_video'}>Tải video lên</Link>
                </div>
            </div>
        </div>
    );
}

export default UploadVideo;
