import { RiPlayList2Line } from 'react-icons/ri';
import { ImPlay3 } from 'react-icons/im';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import useStore from '../../../../../hook/useStore';
import { addToastMessage } from '../../../../../store/actions';
import useTimeConversion from '../../../../../hook/useTimeConversion';
import styles from './PlayList.module.css';
import noImg from '../../../../../assets/img/no_thumbnail.jpg';
function Card({ item }) {
    const [, dispatch] = useStore();
    const handleAlert = () => {
        dispatch(addToastMessage('warning', '', 'Danh sách này không có video nào'));
    };
    const updateTimeAgo = useTimeConversion(item.playlist_updated_at, 'ago');

    const createTimeAgo = useTimeConversion(item.playlist_created_at, 'ago');
    return (
        <div className={clsx(styles.card)}>
            {item.total_video > 0 ? (
                <Link
                    className={clsx(styles.posAbsolute)}
                    to={`/watch?category=${item.video_category_id}&id=${item.video_id}&list=${item.playlist_id}&index=1`}
                ></Link>
            ) : (
                <label className={clsx(styles.posAbsolute)} onClick={handleAlert}></label>
            )}
            <div className={clsx(styles.img)}>
                <div className={clsx(styles.total)}>
                    <span>{item.total_video}</span>
                    <RiPlayList2Line size={17} color="#fff" />
                </div>
                <div className={clsx(styles.playAll)}>
                    <ImPlay3 size={22} color="#fff" />
                    <span>Phát tất cả</span>
                </div>
                <img src={item.video_poster || noImg} />
            </div>
            <div className={clsx(styles.title)}>
                <strong>{item.playlist_name}</strong>
            </div>
            <div className={clsx(styles.time)}>
                <span>
                    {item.playlist_updated_at
                        ? `Cập nhật ${updateTimeAgo}`
                        : `Đã tạo ${createTimeAgo}`}
                </span>
            </div>
            <div className={clsx(styles.more)}>
                <strong>Xem toàn bộ danh sách</strong>
            </div>
        </div>
    );
}

export default Card;
