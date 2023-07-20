import clsx from 'clsx';
import styles from './ChannelInfo.module.css';
function ChannelInfo() {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.avatar)}>
                <div className={clsx(styles.img)}>
                    <div className={clsx(styles.text)}>s</div>
                </div>
                <div className={clsx(styles.name)}>Nguyễn Tuấn Anh</div>
            </div>
            <div className={clsx(styles.lists)}>
                <div className={clsx(styles.item)}>
                    <span>Kênh đăng ký</span>
                    <span>2</span>
                </div>
                <div className={clsx(styles.item)}>
                    <span>Video tải lên</span>
                    <span>0</span>
                </div>
                <div className={clsx(styles.item)}>
                    <span>Video đã thích</span>
                    <span>29</span>
                </div>
            </div>
        </div>
    );
}

export default ChannelInfo;
