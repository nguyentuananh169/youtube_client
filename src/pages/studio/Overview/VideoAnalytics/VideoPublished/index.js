import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Card from '../../../components/Card';
import styles from './VideoPublished.module.css';
import Item from './Item';

function VideoPublished({ videoList }) {
    const arr = videoList;
    arr.shift();
    return (
        <div className={clsx(styles.wrapper)}>
            <Card title={'Video đã xuất bản'}>
                {arr.map((item) => (
                    <Item key={item.video_id} item={item} />
                ))}
                <div className={clsx(styles.linkBtn)}>
                    <p>
                        <Link to="/studio/videos/upload">Chuyển đến danh sách video</Link>
                    </p>
                </div>
            </Card>
        </div>
    );
}

export default VideoPublished;
