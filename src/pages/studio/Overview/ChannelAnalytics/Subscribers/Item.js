import { Link } from 'react-router-dom';
import clsx from 'clsx';
import NoAvatar from '../../../../../components/NoAvatar';
import styles from './Subscribers.module.css';
function Item({ item }) {
    return (
        <div className={clsx(styles.item)}>
            <Link to={`/channel/${item.user_id}/home`}></Link>
            <div className={clsx(styles.avatar)}>
                {item.user_avatar ? (
                    <img src={item.user_avatar} />
                ) : (
                    <NoAvatar userName={item.user_name} />
                )}
            </div>
            <div className={clsx(styles.body)}>
                <div className={clsx(styles.userName)}>
                    <span>{item.user_name}</span>
                </div>
                <div className={clsx(styles.totalSubscribers)}>
                    <span>{`${item.user_total_subscribe} người đăng ký`}</span>
                </div>
            </div>
        </div>
    );
}

export default Item;
