import { VscHistory } from 'react-icons/vsc';
import { RiPlayList2Fill } from 'react-icons/ri';
import { BiLike } from 'react-icons/bi';
import { MdOutlineContentCut } from 'react-icons/md';

import { Link } from 'react-router-dom';
import clsx from 'clsx';
import VideoCard from '../../../components/VideoCard';
import styles from './Contents.module.css';
function Contents() {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.item)}>
                <div className={clsx(styles.title)}>
                    <Link className={clsx(styles.link)} to={'#'}>
                        <VscHistory size={19} />
                        <span>Các video bạn đã xem</span>
                    </Link>
                </div>
                <div className={clsx(styles.content)}>
                    <span>
                        Các video mà bạn đã xem sẽ xuất hiện ở đây.
                        <Link to={'/'}> Duyệt qua các video</Link>
                    </span>
                </div>
            </div>
            <div className={clsx(styles.item)}>
                <div className={clsx(styles.title)}>
                    <Link className={clsx(styles.link)} to={'#'}>
                        <RiPlayList2Fill size={19} />
                        <span>Danh sách phát</span>
                    </Link>
                </div>
                <div className={clsx(styles.content)}>
                    <span>Danh sách phát mà bạn tạo hoặc lưu sẽ xuất hiện ở đây.</span>
                </div>
            </div>
            <div className={clsx(styles.item)}>
                <div className={clsx(styles.title)}>
                    <Link className={clsx(styles.link)} to={'#'}>
                        <BiLike size={20} />
                        <span>Video đã thích</span>
                        <span className={clsx(styles.count)}>22</span>
                    </Link>
                    <Link to={'#'} className={clsx(styles.btnMore)}>
                        Xem tất cả
                    </Link>
                </div>
                <div className={clsx(styles.content)}>
                    <div className={clsx(styles.lists)}>
                        <div className={clsx(styles.card)}>
                            <VideoCard />
                        </div>
                        <div className={clsx(styles.card)}>
                            <VideoCard />
                        </div>
                        <div className={clsx(styles.card)}>
                            <VideoCard />
                        </div>
                        <div className={clsx(styles.card)}>
                            <VideoCard />
                        </div>
                    </div>
                </div>
            </div>
            <div className={clsx(styles.item)}>
                <div className={clsx(styles.title)}>
                    <Link className={clsx(styles.link)} to={'#'}>
                        <MdOutlineContentCut size={19} />
                        <span>Đoạn video của bạn</span>
                    </Link>
                </div>
                <div className={clsx(styles.content)}>
                    <span>
                        Tạo đoạn video và chia sẻ khoảnh khắc bạn yêu thích. Danh sách đoạn video sẽ
                        xuất hiện ngay tại đây.
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Contents;
