import { Link } from 'react-router-dom';
import { AiFillCaretRight } from 'react-icons/ai';
import clsx from 'clsx';
import VideoList from './VideoList';
import VideoPlayer from './VideoPlayer';
import styles from './Home.module.css';
function Home() {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.group, styles.videoPlayer)}>
                <VideoPlayer />
            </div>
            <div className={clsx(styles.group)}>
                <div className={clsx(styles.category)}>
                    <Link to="#">Video</Link>
                    <button>
                        <AiFillCaretRight size={22} />
                        <span>Phát tất cả</span>
                    </button>
                </div>
                <VideoList />
            </div>
            <div className={clsx(styles.group)}>
                <div className={clsx(styles.category)}>
                    <Link to="#">Nhạc Lofi Chill Tiktok - Bụi Chill</Link>
                    <button>
                        <AiFillCaretRight size={22} />
                        <span>Phát tất cả</span>
                    </button>
                </div>
                <VideoList />
            </div>
        </div>
    );
}

export default Home;
