import { Link } from 'react-router-dom';
import clsx from 'clsx';
import formatDuration from '../../../../../hook/formatDuration';
import styles from './Result.module.css';
function Result({ item }) {
    return (
        <Link
            to={`/watch?category=${item.category_id}&id=${item.video_id}`}
            className={clsx(styles.item)}
        >
            <div className={clsx(styles.img)}>
                <img src={item.video_poster} />
                <span className={clsx(styles.duration)}>{formatDuration(item.video_duration)}</span>
            </div>
            <div className={clsx(styles.text)}>
                <span className={clsx(styles.title)}>{item.video_title}</span>
                <div
                    className={clsx(styles.des)}
                    dangerouslySetInnerHTML={{
                        __html: item.video_des,
                    }}
                ></div>
            </div>
            <div className={clsx(styles.time)}>
                <p>23 thg 5, 2023</p>
                <p>Ngày tải lên</p>
            </div>
        </Link>
    );
}

export default Result;
