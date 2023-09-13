import clsx from 'clsx';
import Item from './Item';
import NoData from '../components/NoData';
import styles from './Channels.module.css';
function Channels() {
    return (
        <div className={clsx(styles.wrapper)}>
            <NoData isBtn={false} textSpan={'Kênh này không có bất kỳ kênh nào khác.'} />

            {/* <div className={clsx(styles.title)}>
                <span>Hệ thống kênh Bụi Chill</span>
            </div>
            <div className={clsx(styles.list)}>
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
            </div> */}
        </div>
    );
}

export default Channels;
