import { Link } from 'react-router-dom';
import clsx from 'clsx';
import useTimeConversion from '../../../../../../hook/useTimeConversion';
import styles from './Videos.module.css';
function Item({ item, stt }) {
    const timeAgo = useTimeConversion(item.playlist_update_time, 'ago');
    return (
        <div className={clsx(styles.item)}>
            <div className={clsx(styles.poster)}>
                <div className={clsx(styles.number)}>{stt}</div>
                <div className={clsx(styles.img, { [styles.short]: item.video_type === '1' })}>
                    <div className={clsx(styles.aspectRatio)}>
                        <img src={item.video_poster} />
                        <Link
                            to={`/watch?category=${item.category_id}&id=${item.video_id}&list=${item.playlist_id}&index=${stt}`}
                        ></Link>
                    </div>
                </div>
            </div>
            <div className={clsx(styles.info)}>
                <div className={clsx(styles.title)}>
                    <Link
                        to={`/watch?category=${item.category_id}&id=${item.video_id}&list=${item.playlist_id}&index=${stt}`}
                    >
                        {item.video_title}
                    </Link>
                </div>
                <div
                    className={clsx(styles.des)}
                    dangerouslySetInnerHTML={{
                        __html: item.video_des,
                    }}
                ></div>
                <div className={clsx(styles.date)}>
                    <span>Cập nhật {timeAgo}</span>
                </div>
            </div>
        </div>
    );
}

export default Item;
