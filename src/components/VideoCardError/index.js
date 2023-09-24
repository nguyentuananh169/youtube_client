import clsx from 'clsx';
import styles from './VideoCardError.module.css';
import img from '../../assets/img/no_thumbnail.jpg';
function VideoCardError({ row, width }) {
    return (
        <div className={clsx(styles.wrapper, { [styles.row]: row })}>
            <div className={clsx(styles.img)} style={{ width }}>
                <div className={clsx(styles.aspectRatio)}>
                    <img src={img} />
                </div>
            </div>
            <div className={clsx(styles.info)}>
                <span>Video này không có sẵn hoặc đã bị xóa</span>
            </div>
        </div>
    );
}

export default VideoCardError;
