import clsx from 'clsx';
import Metadata from './Metadata';
import Video from './Video';
import styles from './VideoInfo.module.css';
function VideoInfo({ videoData, loadingPage }) {
    return (
        <div className={clsx(styles.wrapper)}>
            {!loadingPage && (
                <Video videoId={videoData.video_id} videoLink={videoData.video_link} />
            )}
            <Metadata videoData={videoData} />
        </div>
    );
}

export default VideoInfo;
