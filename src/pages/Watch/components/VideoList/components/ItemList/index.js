import { BsThreeDotsVertical } from 'react-icons/bs';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styles from './ItemList.module.css';
import MenuDot from './MenuDot';
import useClickOutSide from '../../../../../../hook/useClickOutSide';
function ItemList({ search = false }) {
    const [elementRef, isShow, setShow] = useClickOutSide();
    const handleShowMenu = () => {
        setShow(!isShow);
    };
    return (
        <div className={clsx(styles.itemList)}>
            <Link className={clsx(styles.link)} to="/watch/11">
                <div className={clsx(styles.thumbnail)}>
                    <span className={clsx(styles.duration)}>1:11:22</span>
                    <img src="https://res-console.cloudinary.com/dkg7pdt03/thumbnails/v1/video/upload/v1671353025/dmlkZW8yX25zbjVzOQ==/grid_landscape" />
                </div>
                <div className={clsx(styles.info)}>
                    <div className={clsx(styles.title)}>
                        <strong>
                            Nhạc Thư Giãn Giảm Căng Thẳng Mệt Mỏi Tức Thì, Xua Tan Cảm Xúc Tiêu Cực,
                            Tăng Cường Sự Tập Trung
                        </strong>
                    </div>
                    <div className={clsx(styles.owner)}>
                        <span>Nguyễn Tuấn Anh</span>
                    </div>
                    <div className={clsx(styles.meta)}>
                        <span>71 N lượt xem • 1 năm trước</span>
                    </div>
                </div>
            </Link>
            <div ref={elementRef} className={clsx(styles.dot)} onClick={handleShowMenu}>
                <BsThreeDotsVertical />
                {isShow && <MenuDot />}
            </div>
        </div>
    );
}

export default ItemList;
