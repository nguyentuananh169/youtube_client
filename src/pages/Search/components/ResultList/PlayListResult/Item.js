import { BsDot, BsCheckCircleFill } from 'react-icons/bs';
import { RiPlayList2Line } from 'react-icons/ri';
import { FaPlay } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Tooltip from '../../../../../components/Tooltip';
import formatDuration from '../../../../../hook/formatDuration';
import styles from './PlayListResult.module.css';
function Item({ item }) {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.img)}>
                <Link
                    to={`/watch?category=${item.videoList[0].category_id}&id=${item.videoList[0].video_id}&list=${item.playlist_id}&index=1`}
                ></Link>
                <div className={clsx(styles.overlay)}>
                    <FaPlay size={15} />
                    <span>Phát tất cả</span>
                </div>
                <div className={clsx(styles.overlayBottom)}>
                    <RiPlayList2Line size={16} />
                    <span>{item.total_video} video</span>
                </div>
                <div className={clsx(styles.aspectRatio)}>
                    <img src={item.videoList[0].video_poster} />
                </div>
            </div>
            <div className={clsx(styles.info)}>
                <div className={clsx(styles.title)}>
                    <Link
                        to={`/watch?category=${item.videoList[0].category_id}&id=${item.videoList[0].video_id}&list=${item.playlist_id}&index=1`}
                    >
                        {item.playlist_name}
                    </Link>
                </div>
                <div className={clsx(styles.owner)}>
                    <Link to={`/channel/${item.user_id}/home`}>
                        <div className={clsx(styles.name)}>
                            <Tooltip
                                content={item.user_name}
                                customStyle={{
                                    bottom: '0',
                                    left: '50%',
                                    transform: 'translate(-50%,-50%)',
                                    whiteSpace: 'nowrap',
                                    fontSize: '1.2rem',
                                }}
                            />
                            <span>{item.user_name}</span>
                        </div>
                        <div className={clsx(styles.offical)}>
                            <Tooltip
                                content={'Đã xác minh'}
                                customStyle={{
                                    bottom: '0',
                                    left: '50%',
                                    transform: 'translate(-50%,-50%)',
                                    whiteSpace: 'nowrap',
                                    fontSize: '1.2rem',
                                }}
                            />
                            <BsCheckCircleFill size={12} />
                        </div>
                    </Link>
                </div>
                <div className={clsx(styles.videoInfo)}>
                    {item.videoList.map((item2, index) => (
                        <Link
                            key={item2.video_id}
                            to={`/watch?category=${item2.category_id}&id=${item2.video_id}&list=${
                                item.playlist_id
                            }&index=${index + 1}`}
                        >
                            {item2.video_title} {<BsDot />} {formatDuration(item2.video_duration)}
                        </Link>
                    ))}
                </div>
                <div className={clsx(styles.seePlaylist)}>
                    <Link
                        to={`/watch?category=${item.videoList[0].category_id}&id=${item.videoList[0].video_id}&list=${item.playlist_id}&index=1`}
                    >
                        Xem toàn bộ danh sách
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Item;
