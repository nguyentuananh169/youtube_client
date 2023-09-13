import VideoCard from '../../../../../components/VideoCard';
function VideoResults({ resultList = [] }) {
    return (
        <>
            {resultList.map((item) => (
                <VideoCard key={item.video_id} item={item} isPreview row showDes />
            ))}
        </>
    );
}

export default VideoResults;
