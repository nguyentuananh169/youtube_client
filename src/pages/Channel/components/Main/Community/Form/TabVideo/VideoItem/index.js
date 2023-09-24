import { TfiClose } from 'react-icons/tfi';
import clsx from 'clsx';
import VideoCard from '../../../../../../../../components/VideoCard';
import styles from './VideoItem.module.css';
function VideoItem({ handleCloseTab, item }) {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.close)} onClick={() => handleCloseTab('video_id')}>
                <TfiClose size={17} />
            </div>
            <VideoCard item={item} row width="200px" hidenDotMenu rowOwner />
        </div>
    );
}

export default VideoItem;
