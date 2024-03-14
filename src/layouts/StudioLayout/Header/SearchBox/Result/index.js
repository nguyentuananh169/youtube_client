import { Link } from 'react-router-dom';
import clsx from 'clsx';
import formatDuration from '../../../../../hook/formatDuration';
import useTimeConversion from '../../../../../hook/useTimeConversion';
import styles from './Result.module.css';
function Result({ item }) {
    const { date, month, year } = useTimeConversion(item.video_created_at, 'object');
    return (
        <Link
            to={`/watch?category=${item.category_id}&id=${item.video_id}`}
            className={clsx(styles.item)}
        >
            <div className={clsx(styles.img, { [styles.short]: item.video_type === '1' })}>
                <div className={clsx(styles.aspectRatio)}>
                    <img src={item.video_poster} />
                    <span className={clsx(styles.duration)}>
                        {formatDuration(item.video_duration)}
                    </span>
                </div>
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
                <p>
                    {date} thg {month}, {year}
                </p>
                <p>Ngày tải lên</p>
            </div>
        </Link>
    );
}

export default Result;
