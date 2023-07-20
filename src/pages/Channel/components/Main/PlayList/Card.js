import { AiOutlineBars } from 'react-icons/ai';
import { ImPlay3 } from 'react-icons/im';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './PlayList.module.css';
function Card({ total, img, title, time, link }) {
    return (
        <div className={clsx(styles.card)}>
            <Link to={link}>
                <div className={clsx(styles.img)}>
                    <div className={clsx(styles.total)}>
                        <span>{total}</span>
                        <AiOutlineBars size={18} color="#fff" />
                    </div>
                    <div className={clsx(styles.playAll)}>
                        <ImPlay3 size={22} color="#fff" />
                        <span>Phát tất cả</span>
                    </div>
                    <img src={img} />
                </div>
                <div className={clsx(styles.title)}>
                    <strong>{title}</strong>
                </div>
                <div className={clsx(styles.time)}>
                    <span>{time}</span>
                </div>
                <div className={clsx(styles.more)}>
                    <strong>Xem toàn bộ danh sách</strong>
                </div>
            </Link>
        </div>
    );
}

export default Card;
