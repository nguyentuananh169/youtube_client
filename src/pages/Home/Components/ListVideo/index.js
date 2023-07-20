import clsx from 'clsx';
import VideoCard from '../../../../components/VideoCard';
import styles from './ListVideo.module.css';
function ListVideo() {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.videoList)}>
                {Array(10)
                    .fill(0)
                    .map((item, index) => (
                        <div className={clsx(styles.item)} key={index}>
                            <VideoCard isPreview />
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default ListVideo;
