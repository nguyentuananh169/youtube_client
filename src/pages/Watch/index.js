import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import Comments from './components/Comments';
import VideoList from './components/VideoList';
import VideoInfo from './components/VideoInfo';
import videoApi from '../../api/videoApi';
import Loading from './Loading';
import queryString from 'query-string';
import Playlist from './components/Playlist';
import styles from './Watch.module.css';
import Unavailable from '../../components/Unavailable';
import img from '../../assets/img/unavailable_video.png';
function Watch() {
    const [isLoading, setLoading] = useState(true);
    const [videoData, setVideoData] = useState({});
    const { search } = useLocation();
    const urlParams = queryString.parse(search);
    useEffect(() => {
        const fectVideo = async () => {
            setLoading(true);
            const formData = {
                type: 'video_id',
                id: urlParams.id,
            };
            const response = await videoApi.get(formData);
            setVideoData(response.videoList[0] || {});
            setLoading(false);
        };
        fectVideo();
        window.scrollTo(0, 0);
    }, [urlParams.id]);
    return (
        <div className={clsx(styles.wrapper)}>
            {isLoading && <Loading />}
            {videoData?.user_id && (
                <div className={clsx(styles.main, { [styles.hidden]: isLoading })}>
                    <VideoInfo videoData={videoData} loadingPage={isLoading} />
                    <Comments
                        loadingPage={isLoading}
                        ownerId={videoData.user_id}
                        ownerName={videoData.user_name}
                        ownerAvatar={videoData.user_avatar}
                    />
                </div>
            )}
            {videoData?.user_id && (
                <div className={clsx(styles.videoList)}>
                    {urlParams?.list && (
                        <Playlist
                            loadingPage={isLoading}
                            urlParams={urlParams}
                            userId={videoData.user_id}
                            userTag={videoData.user_tag}
                            userName={videoData.user_name}
                        />
                    )}
                    <VideoList
                        urlParams={urlParams}
                        loadingPage={isLoading}
                        userId={videoData.user_id}
                        userName={videoData.user_name}
                    />
                </div>
            )}

            {!isLoading && !videoData?.video_id && (
                <Unavailable
                    img={img}
                    title={'Video không có sẵn'}
                    text={'Người tải lên đã xóa video này'}
                    linkText={'Chuyển đến trang chủ'}
                    linkUrl={'/'}
                />
            )}
        </div>
    );
}

export default Watch;
