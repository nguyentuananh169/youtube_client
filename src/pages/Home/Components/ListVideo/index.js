import clsx from 'clsx';
import VideoCard from '../../../../components/VideoCard';
import styles from './ListVideo.module.css';
function ListVideo() {
    return (
        <div className={clsx(styles.wrapper)}>
            {Array(10)
                .fill(0)
                .map((item, index) => (
                    <VideoCard key={index} marginLeft="16px" marginBottom="35px" />
                ))}
        </div>
    );
}

export default ListVideo;
