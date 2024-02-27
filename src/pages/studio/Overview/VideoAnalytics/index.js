import { useEffect, useState } from 'react';
import UploadVideo from './UploadVideo';
import VideoPerformance from './VideoPerformance';
import videoApi from '../../../../api/videoApi';
import Loading from './VideoPerformance/Loading';
import VideoPublished from './VideoPublished';
function ChannelAnalytics() {
    const [isLoading, setLoading] = useState(true);
    const [videoList, setVideoList] = useState([]);
    useEffect(() => {
        const fetchVideoPerformance = async () => {
            setLoading(true);
            const formData = {
                type: 'get_by_token',
                limit: 5,
            };
            const response = await videoApi.get(formData);
            if (response.videoList.length > 0) {
                setVideoList(response.videoList);
            }
            setLoading(false);
        };
        fetchVideoPerformance();
    }, []);
    return (
        <>
            {isLoading && <Loading />}
            {!isLoading && videoList.length > 0 && <VideoPerformance video={videoList[0]} />}
            {!isLoading && videoList.length >= 2 && <VideoPublished videoList={videoList} />}
            {!isLoading && videoList.length === 0 && <UploadVideo />}
        </>
    );
}

export default ChannelAnalytics;
