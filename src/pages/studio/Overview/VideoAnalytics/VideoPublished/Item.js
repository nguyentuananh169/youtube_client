import { BarChart2, MessageSquare, ThumbsUp } from 'react-feather';
import clsx from 'clsx';
import numberConversion from '../../../../../hook/useNumberConversion';
import styles from './VideoPublished.module.css';
import Actions from './Actions';
function Item({ item }) {
    return (
        <div className={clsx(styles.item, styles.mgt10)}>
            <div className={clsx(styles.img, { [styles.short]: item.video_type === '1' })}>
                <div className={clsx(styles.aspectRatio)}>
                    <img src={item.video_poster} />
                </div>
            </div>
            <div className={clsx(styles.body)}>
                <div className={clsx(styles.title)}>{item.video_title}</div>
                <div className={clsx(styles.videoMetrics)}>
                    <div className={clsx(styles.metrics)}>
                        <BarChart2 strokeWidth={1} size={15} />
                        <span>{numberConversion(item.video_views, 'compression')}</span>
                    </div>
                    <div className={clsx(styles.metrics)}>
                        <MessageSquare strokeWidth={1} size={15} />
                        <span>{numberConversion(item.video_cmt, 'compression')}</span>
                    </div>
                    <div className={clsx(styles.metrics)}>
                        <ThumbsUp strokeWidth={1} size={15} />
                        <span>{numberConversion(item.video_like, 'compression')}</span>
                    </div>
                </div>
                <div className={clsx(styles.actions)}>
                    <Actions videoId={item.video_id} categoryId={item.category_id} />
                </div>
            </div>
        </div>
    );
}

export default Item;
