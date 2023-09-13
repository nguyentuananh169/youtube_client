import { Link, useParams } from 'react-router-dom';
import { AiFillCaretRight } from 'react-icons/ai';
import clsx from 'clsx';
import VideoPlayer from './VideoPlayer';
import styles from './Home.module.css';
import { useEffect } from 'react';
import { useState } from 'react';
import videoApi from '../../../../../api/videoApi';
import VideoList from './VideoList';
function Home() {
    const { id, page } = useParams();
    const [videoList, setVideoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const fetchVideoList = async () => {
        const formData = {
            type: 'user_id',
            id: id,
            page: 1,
            limit: 10,
        };
        const response = await videoApi.get(formData);
        setVideoList(response.videoList);
        setIsLoading(false);
    };
    useEffect(() => {
        if (id && page === 'home' && isLoading) {
            fetchVideoList();
        }
    }, [isLoading, page]);
    useEffect(() => {
        setIsLoading(true);
    }, [id]);
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.group, styles.videoPlayer)}>
                <VideoPlayer />
            </div>
            <div className={clsx(styles.group)}>
                <div className={clsx(styles.category)}>
                    <label>Video gần đây</label>
                    <Link to={`/channel/${id}/videos`} className={clsx(styles.btn)}>
                        <AiFillCaretRight size={22} />
                        <span>Phát tất cả</span>
                    </Link>
                </div>
                <VideoList itemList={videoList} />
            </div>
        </div>
    );
}

export default Home;
