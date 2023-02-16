import clsx from 'clsx';
import VideoPlay from '../../components/VideoPlay';
import Comments from './components/Comments';
import Metadata from './components/Metadata';
import VideoList from './components/VideoList';
import styles from './Watch.module.css';
function Watch() {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.main)}>
                <div className={clsx(styles.video)}>
                    <VideoPlay controls />
                </div>
                <div className={clsx(styles.metadata)}>
                    <Metadata />
                </div>
                <div className={clsx(styles.comments)}>
                    <Comments />
                </div>
            </div>
            <div className={clsx(styles.videoList)}>
                <VideoList />
            </div>
        </div>
    );
}

export default Watch;
