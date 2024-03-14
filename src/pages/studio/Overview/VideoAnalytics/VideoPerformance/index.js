import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Card from '../../../components/Card';
import numberConversion from '../../../../../hook/useNumberConversion';
import timeConversion from '../../../../../hook/useTimeConversion';
import DotMenu from '../../../../../components/DotMenu';
import styles from './VideoPerformance.module.css';
import { BarChart2, ChevronDown, ChevronUp, MessageSquare, ThumbsUp } from 'react-feather';
function VideoPerformance({ video }) {
    const analyticsRef = useRef(null);
    const analyticsHeightRef = useRef(0);
    const [isCollapse, setIsCollapse] = useState(false);
    const agoObject = timeConversion(video.video_created_at, 'ago-object');
    let videoTime = 'Vừa xong';
    if (agoObject.year > 0) {
        videoTime = `${agoObject.year} năm ${agoObject.month} tháng đầu tiên`;
    } else if (agoObject.month > 0) {
        videoTime = `${agoObject.month} tháng ${agoObject.day} ngày đầu tiên`;
    } else if (agoObject.day > 0) {
        videoTime = `${agoObject.day} ngày ${agoObject.hours} giờ đầu tiên`;
    } else if (agoObject.hours > 0) {
        videoTime = `${agoObject.hours} giờ ${agoObject.minutes} phút đầu tiên`;
    } else if (agoObject.minutes > 0) {
        videoTime = `${agoObject.minutes} phút ${agoObject.seconds} giây đầu tiên`;
    } else if (agoObject.seconds > 0) {
        videoTime = `${agoObject.seconds} giây đầu tiên`;
    }
    useEffect(() => {
        if (analyticsRef.current) {
            analyticsHeightRef.current = analyticsRef.current.clientHeight + 'px';
        }
    }, []);
    useEffect(() => {
        if (isCollapse) {
            analyticsRef.current.style.height = 0;
        } else {
            analyticsRef.current.style.height = analyticsHeightRef.current;
        }
    }, [isCollapse]);
    return (
        <Card title={'Hiệu suất của video mới nhất'}>
            <div className={clsx(styles.img, { [styles.short]: video.video_type === '1' })}>
                <div className={clsx(styles.aspectRatio)}>
                    <img src={video.video_poster} />
                </div>
                <div className={clsx(styles.videoName)}>
                    <span>{video.video_title}</span>
                </div>
            </div>
            <div className={clsx(styles.statistical)}>
                <div className={clsx(styles.collapsableBar)}>
                    <div className={clsx(styles.videoMetrics)}>
                        <div className={styles.metrics}>
                            <BarChart2 strokeWidth={1} size={15} />
                            <span>{numberConversion(video.video_views, 'compression')}</span>
                        </div>
                        <div className={styles.metrics}>
                            <MessageSquare strokeWidth={1} size={15} />
                            <span>{numberConversion(video.video_cmt, 'compression')}</span>
                        </div>
                        <div className={styles.metrics}>
                            <ThumbsUp strokeWidth={1} size={15} />
                            <span>{numberConversion(video.video_like, 'compression')}</span>
                        </div>
                    </div>
                    <div
                        className={clsx(styles.collapsable)}
                        onClick={() => setIsCollapse(!isCollapse)}
                    >
                        <DotMenu
                            icon={
                                isCollapse ? (
                                    <ChevronDown strokeWidth={1} size={20} />
                                ) : (
                                    <ChevronUp strokeWidth={1} size={20} />
                                )
                            }
                        />
                    </div>
                </div>
                <div className={clsx(styles.analytics)} ref={analyticsRef}>
                    <div className={clsx(styles.text, styles.title)}>
                        <span>{videoTime}</span>
                    </div>
                    <div className={clsx(styles.text)}>
                        <span>Số lượt xem</span>
                        <span>{numberConversion(video.video_views, 'compression')}</span>
                    </div>
                    <div className={clsx(styles.text)}>
                        <span>Tỷ lệ nhấp của số lượt hiển thị hình thu nhỏ</span>
                        <span>—</span>
                    </div>
                    <div className={clsx(styles.text)}>
                        <span>Thời lượng xem trung bình</span>
                        <span>—</span>
                    </div>
                </div>
            </div>
            <div className={clsx(styles.linkBtn)}>
                <p>
                    <Link to={'#'}>Xem số liệu phân tích video</Link>
                </p>
                <p>
                    <Link to={`/studio/comments/${video.video_id}`}>
                        Xem bình luận ({video.video_cmt})
                    </Link>
                </p>
            </div>
        </Card>
    );
}

export default VideoPerformance;
