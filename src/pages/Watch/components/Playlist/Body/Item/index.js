import { BsPlayFill } from 'react-icons/bs';
import clsx from 'clsx';
import styles from './Item.module.css';
import { Link } from 'react-router-dom';
function Item({ item, count, active }) {
    return (
        <div className={clsx(styles.wrapper, { [styles.active]: active })}>
            <Link
                to={`/watch?category=${item.category_id}&id=${item.video_id}&list=${item.playlist_id}&index=${count}`}
            ></Link>
            <div className={clsx(styles.count)}>
                <span>{active ? <BsPlayFill size={16} /> : count}</span>
            </div>
            <div className={clsx(styles.img, { [styles.short]: item.video_type === '1' })}>
                <div className={clsx(styles.aspectRatio)}>
                    <img src={item.video_poster} />
                </div>
            </div>
            <div className={clsx(styles.info)}>
                <div className={clsx(styles.title)}>
                    <span>{item.video_title}</span>
                </div>
                <div className={clsx(styles.userName)}>
                    <span>{item.user_name}</span>
                </div>
            </div>
        </div>
    );
}

export default Item;
