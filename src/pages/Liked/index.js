import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Left from './Left';
import Right from './Right';
import videoVotesApi from '../../api/videoVotesApi';
import Modal from './Modal';
import { addToastMessage } from '../../store/actions/toastMessage';
import styles from './Liked.module.css';
import { Navigate } from 'react-router-dom';
import NoResult from '../../components/NoResult';
import { useDispatch, useSelector } from 'react-redux';
function Liked() {
    const [isLoading, setIsLoading] = useState(true);
    const [videoList, setVideoList] = useState([]);
    const [isShowModal, setIsShowModal] = useState(false);
    const [videoData, setVideoData] = useState({});
    const [indexVideo, setIndexVideo] = useState(0);
    const [isNextVideo, setIsNextVideo] = useState(false);

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
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
    const handleNextVideo = () => {
        if (isNextVideo) {
            return;
        }
        const index = indexVideo + 1;
        if (index < videoList.length) {
            setIndexVideo(index);
            setVideoData(videoList[index]);
            setIsNextVideo(true);
        } else {
            setIsShowModal(false);
            dispatch(addToastMessage('warning', '', 'Đã phát hết video trong danh sách'));
        }
    };
    const handlePrevVideo = () => {
        if (isNextVideo) {
            return;
        }
        const index = indexVideo - 1;
        console.log(index);
        if (index >= 0) {
            setIndexVideo(index);
            setVideoData(videoList[index]);
            setIsNextVideo(true);
        } else {
            dispatch(addToastMessage('error', 'Thất bại', 'Không còn video để quay lại'));
        }
    };
    useEffect(() => {
        if (isShowModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isShowModal]);
    if (!auth.isLogin && !auth.user?.user_id) {
        return <Navigate to={'/'} replace />;
    }
    return (
        <div className={clsx(styles.wrapper)}>
            {isShowModal && !isLoading && (
                <Modal
                    indexVideo={indexVideo}
                    isNextVideo={isNextVideo}
                    setIsNextVideo={setIsNextVideo}
                    videoData={videoData}
                    setIndexVideo={setIndexVideo}
                    setIsShowModal={setIsShowModal}
                    handleNextVideo={handleNextVideo}
                    handlePrevVideo={handlePrevVideo}
                />
            )}
            <Left
                isLoading={isLoading}
                index={indexVideo}
                videoData={videoList[indexVideo]}
                handleOpenModal={handleOpenModal}
            />
            <Right
                isLoading={isLoading}
                indexVideo={indexVideo}
                videoList={videoList}
                handleOpenModal={handleOpenModal}
            />
            {!isLoading && videoList.length === 0 && (
                <NoResult text="Chưa có video nào trong danh sách phát này" />
            )}
        </div>
    );
}

export default Liked;
