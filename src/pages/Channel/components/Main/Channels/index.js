import clsx from 'clsx';
import styles from './Channels.module.css';
import Item from './Item';
function Channels() {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.title)}>
                <span>Hệ thống kênh Bụi Chill</span>
            </div>
            <div className={clsx(styles.list)}>
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
            </div>
        </div>
    );
}

export default Channels;
