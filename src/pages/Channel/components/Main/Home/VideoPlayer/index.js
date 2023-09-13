import { BsDot, BsThreeDotsVertical } from 'react-icons/bs';
import { AiFillClockCircle } from 'react-icons/ai';
import { RiShareForwardFill, RiCloseLine } from 'react-icons/ri';

import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import clsx from 'clsx';
import VideoPlay from '../../../../../../components/VideoPlay';
import Tooltip from '../../../../../../components/Tooltip';
import videoApi from '../../../../../../api/videoApi';
import Loading from './Loading';
import useNumberConversion from '../../../../../../hook/useNumberConversion';
import useTimeConversion from '../../../../../../hook/useTimeConversion';
import styles from './VideoPlayer.module.css';

function VideoPlayer() {
    const [isShow, setIsShow] = useState(false);
    const [videoData, setVideoData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { id, page } = useParams();
    const fetchVideoByViews = async () => {
        setIsLoading(true);
        const formData = {
            type: 'user_id',
            id: id,
            order_by: 'video_views',
            order_type: 'DESC',
            limit: 1,
            page: 1,
        };
        const response = await videoApi.get(formData);
        setVideoData(response.videoList[0] || {});
        setIsLoading(false);
    };

    useEffect(() => {
        if (id && page === 'home' && isLoading) {
            fetchVideoByViews();
        }
    }, [isLoading, page]);
    useEffect(() => {
        if (id) {
            setIsLoading(true);
        }
    }, [id]);
    const numberConversion = useNumberConversion;
    const timeConversion = useTimeConversion;

    return (
        <div className={clsx(styles.wrapper)}>
            {isLoading && <Loading />}
            {!isLoading && videoData?.video_id && (
                <>
                    <div className={clsx(styles.videoPlayer)}>
                        {page === 'home' && (
                            <VideoPlay
                                videoId={videoData.video_id}
                                videoLink={videoData.video_link}
                                autoPlay
                                mute="true"
                                size="medium"
                            />
                        )}
                        <div className={clsx(styles.top)}>
                            <div className={clsx(styles.title)}>
                                <Link
                                    to={`/watch?category=${videoData.category_id}&id=${videoData.video_id}`}
                                >
                                    {videoData.video_title}
                                </Link>
                            </div>
                            <div className={clsx(styles.btnDot)} onClick={() => setIsShow(!isShow)}>
                                <BsThreeDotsVertical size={20} color="#fff" />
                            </div>
                        </div>
                        {isShow && (
                            <div className={clsx(styles.overlay)}>
                                <div
                                    className={clsx(styles.close)}
                                    onClick={() => setIsShow(!isShow)}
                                >
                                    <Tooltip
                                        content="Đóng"
                                        customStyle={{
                                            backgroundColor: 'rgba(0,0,0,0.6)',
                                            right: 0,
                                            top: 'calc(100% + 15px)',
                                        }}
                                    />
                                    <RiCloseLine size={40} />
                                </div>
                                <div className={clsx(styles.buttons)}>
                                    <div className={clsx(styles.btn)}>
                                        <Tooltip
                                            content="Xem sau"
                                            customStyle={{
                                                backgroundColor: 'rgba(0,0,0,0.6)',
                                                left: '50%',
                                                top: 'calc(100% + 15px)',
                                                transform: 'translate(-50%,0)',
                                                whiteSpace: 'nowrap',
                                            }}
                                        />
                                        <AiFillClockCircle size={35} color="#fff" />
                                    </div>
                                    <div className={clsx(styles.btn)}>
                                        <Tooltip
                                            content="Chia sẻ"
                                            customStyle={{
                                                backgroundColor: 'rgba(0,0,0,0.6)',
                                                left: '50%',
                                                top: 'calc(100% + 15px)',
                                                transform: 'translate(-50%,0)',
                                                whiteSpace: 'nowrap',
                                            }}
                                        />
                                        <RiShareForwardFill size={35} color="#fff" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={clsx(styles.details)}>
                        <Link
                            className={clsx(styles.link)}
                            to={`/watch?category=${videoData.category_id}&id=${videoData.video_id}`}
                        ></Link>
                        <div className={clsx(styles.title)}>
                            <h3>{videoData.video_title}</h3>
                        </div>
                        <div className={clsx(styles.time)}>
                            <span>
                                {numberConversion(videoData.video_views, 'commas')} lượt xem
                            </span>
                            <BsDot size={20} />
                            <span>{timeConversion(videoData.video_created_at, 'ago')}</span>
                        </div>
                        <div className={clsx(styles.des)}>
                            {videoData.video_des ? (
                                <div
                                    dangerouslySetInnerHTML={{ __html: videoData.video_des }}
                                ></div>
                            ) : (
                                <span className={clsx(styles.noDes)}>Không có mô tả video</span>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default VideoPlayer;
