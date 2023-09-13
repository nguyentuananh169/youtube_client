import clsx from 'clsx';
import VideoCard from '../../../../components/VideoCard';
import styles from './ListVideo.module.css';
function Item({ item }) {
    return (
        <div className={clsx(styles.item)}>
            <VideoCard isPreview item={item} />
        </div>
    );
}

export default Item;
