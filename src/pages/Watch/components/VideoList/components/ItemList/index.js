import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styles from './ItemList.module.css';
import MenuDot from './MenuDot';
function ItemList() {
    const [isActiveDot, setActiveDot] = useState(false);
    return (
        <div className={clsx(styles.itemList)}>
            <Link className={clsx(styles.link)} to="/watch/11">
                <div className={clsx(styles.thumbnail)}>
                    <span className={clsx(styles.duration)}>1:11:22</span>
                    <img src="https://i.ytimg.com/vi/6HR4pEcXoQw/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD5KLku323I-jikbM6fOwVRs8DA1g" />
                </div>
                <div className={clsx(styles.info)}>
                    <div className={clsx(styles.title)}>
                        <strong>Đồng hồ đếm ngược 59 phút</strong>
                    </div>
                    <div className={clsx(styles.owner)}>
                        <span>Nguyễn Tuấn Anh</span>
                    </div>
                    <div className={clsx(styles.meta)}>
                        <span>71 N lượt xem • 1 năm trước</span>
                    </div>
                </div>
            </Link>
            <div
                className={clsx(styles.dot, { [styles.active]: isActiveDot })}
                onClick={() => setActiveDot(!isActiveDot)}
            >
                <BsThreeDotsVertical />
                <MenuDot />
            </div>
        </div>
    );
}

export default ItemList;
