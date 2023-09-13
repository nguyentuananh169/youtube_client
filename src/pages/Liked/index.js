import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Left from './Left';
import Right from './Right';
import videoVotesApi from '../../api/videoVotesApi';
import Modal from './Modal';
import { addToastMessage } from '../../store/actions';
import useStore from '../../hook/useStore';
import styles from './Liked.module.css';
import { Navigate } from 'react-router-dom';
import NoResult from '../../components/NoResult';
function Liked() {
    const [isLoading, setIsLoading] = useState(true);
    const [videoList, setVideoList] = useState([]);
    const [isShowModal, setIsShowModal] = useState(false);
    const [videoData, setVideoData] = useState({});
    const [indexVideo, setIndexVideo] = useState(0);
    const [isNextVideo, setIsNextVideo] = useState(false);

    const [state, dispatch] = useStore();
    useEffect(() => {
        const fetchVideoByVote = async () => {
            setIsLoading(true);
            const response = await videoVotesApi.showVideoByVote({ _is_unlimited: true });
            setVideoList(response.list);
            setIsLoading(false);
        };
        fetchVideoByVote();
    }, []);
    const handleOpenModal = (index) => {
        setIndexVideo(index);
        setVideoData(videoList[index]);
        setIsShowModal(true);
    };
    const handleEndedVideo = () => {
        if (indexVideo + 1 < videoList.length) {
            setIndexVideo(indexVideo + 1);
            setVideoData(videoList[indexVideo + 1]);
            setIsNextVideo(true);
        } else {
            setIsShowModal(false);
            dispatch(addToastMessage('success', '', 'Đã phát hết video trong danh sách'));
        }
    };
    useEffect(() => {
        if (isShowModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isShowModal]);
    if (!state.isLogin && !state.user?.user_id) {
        return <Navigate to={'/'} replace />;
    }
    return (
        <div className={clsx(styles.wrapper)}>
            {isShowModal && !isLoading && (
                <Modal
                    isNextVideo={isNextVideo}
                    setIsNextVideo={setIsNextVideo}
                    videoData={videoData}
                    setIsShowModal={setIsShowModal}
                    handleEndedVideo={handleEndedVideo}
                />
            )}
            <Left
                isLoading={isLoading}
                index={indexVideo}
                videoData={videoList[indexVideo]}
                handleOpenModal={handleOpenModal}
            />
            <Right isLoading={isLoading} indexVideo={indexVideo} videoList={videoList} />
            {!isLoading && videoList.length === 0 && (
                <NoResult text="Chưa có video nào trong danh sách phát này" />
            )}
        </div>
    );
}

export default Liked;
