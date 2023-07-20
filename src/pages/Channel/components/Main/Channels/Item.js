import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Channels.module.css';
function Item() {
    return (
        <div className={clsx(styles.item)}>
            <Link to={'#'}>
                <div className={clsx(styles.img)}>
                    <img src="https://yt3.googleusercontent.com/gqG_aR9B8SlJw4cW9PVq0N7toikRLfV4rBYwKShDqZ49sScY9R4FZK6_2mfsO_uBsJ4ayNN5Aw=s176-c-k-c0x00ffffff-no-rj" />
                </div>
                <div className={clsx(styles.channelName)}>
                    <span>Bụi Chill 2</span>
                </div>
                <div className={clsx(styles.subscribers)}>
                    <span>967 N người đăng ký</span>
                </div>
                <div className={clsx(styles.action)}>
                    <button>Đăng ký</button>
                </div>
            </Link>
        </div>
    );
}

export default Item;
