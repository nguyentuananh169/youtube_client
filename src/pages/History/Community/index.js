import clsx from 'clsx';

import styles from './Community.module.css';
import Item from './Item';
function Community() {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.title)}>
                <span>Cộng đồng</span>
            </div>
            <div className={clsx(styles.noData)}>
                <span>Danh sách này không có hoạt động nào.</span>
            </div>
            {/* {Array(10)
                .fill(0)
                .map((item, index) => (
                    <Item key={index} />
                ))} */}
        </div>
    );
}

export default Community;
