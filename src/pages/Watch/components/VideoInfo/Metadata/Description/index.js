import { TfiClose } from 'react-icons/tfi';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Button from '../../../../../../components/Button';
import useTimeConversion from '../../../../../../hook/useTimeConversion';
import NoAvatar from '../../../../../../components/NoAvatar';
import styles from './Description.module.css';
import useNumberConversion from '../../../../../../hook/useNumberConversion';
function Description({ videoData }) {
    const [isMore, setMore] = useState(false);
    const desRef = useRef(null);
    const { date, month, year } = useTimeConversion(videoData.video_created_at, 'object');
    const timeAgo = useTimeConversion(videoData.video_created_at, 'ago');
    const handleToggleMore = () => {
        setMore(!isMore);
        if (isMore) {
            const autoBack = setInterval(() => {
                document.documentElement.scrollTop -= 20;
                if (document.documentElement.scrollTop <= desRef.current.offsetTop) {
                    clearInterval(autoBack);
                }
            }, 1);
        }
    };
    useEffect(() => {
        if (window.innerWidth <= 768 && isMore) {
            document.body.style.overflow = 'hidden';
            document.body.style.backgroundColor = 'rgba(0, 0, 0, .5)';
        } else {
            document.body.style.overflow = '';
            document.body.style.backgroundColor = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.backgroundColor = '';
        };
    }, [isMore]);
    const views = useNumberConversion(videoData.video_views, 'compression');
    const views2 = useNumberConversion(videoData.video_views, 'commas');
    const like = useNumberConversion(videoData.video_like, 'compression');
    return (
        <div ref={desRef} className={clsx(styles.desContainer)}>
            <div className={clsx(styles.des, { [styles.more]: isMore })}>
                <div className={clsx(styles.heading)}>
                    <h3>Nội dung mô tả</h3>
                    <TfiClose size={19} onClick={() => setMore(false)} />
                </div>
                <div className={clsx(styles.content)}>
                    <div className={clsx(styles.title)}>
                        <h3>{videoData.video_title}</h3>
                        <div className={clsx(styles.owner)}>
                            {videoData.user_avatar ? (
                                <img src={videoData.user_avatar} />
                            ) : (
                                <div className={clsx(styles.noAvatar)}>
                                    <NoAvatar userName={videoData.user_name} />
                                </div>
                            )}

                            <span>{videoData.user_name}</span>
                        </div>
                        <div className={clsx(styles.info1)}>
                            <div className={clsx(styles.item)}>
                                <strong>{like}</strong>
                                <p>Lượt thích</p>
                            </div>
                            <div className={clsx(styles.item)}>
                                <strong>{views}</strong>
                                <p>Lượt xem</p>
                            </div>
                            <div className={clsx(styles.item)}>
                                <strong>
                                    {date} thg {month}
                                </strong>
                                <p>{year}</p>
                            </div>
                        </div>
                    </div>
                    <div className={clsx(styles.info2)}>
                        <strong style={{ color: '#606060' }}>
                            <span>{views2} lượt xem</span>
                            <span style={{ display: 'inline-block', marginLeft: '7px' }}>
                                {timeAgo}
                            </span>
                        </strong>
                    </div>
                    {videoData.video_des ? (
                        <div
                            className={clsx(styles.text, { [styles.collapse]: !isMore })}
                            dangerouslySetInnerHTML={{ __html: videoData.video_des }}
                        ></div>
                    ) : (
                        <span className={clsx(styles.noDes)}>Không có mô tả video</span>
                    )}
                </div>
            </div>
            {videoData.video_des && (
                <div className={clsx(styles.more)}>
                    <Button onClick={handleToggleMore}>{isMore ? 'Ẩn bớt' : 'Xem thêm'}</Button>
                </div>
            )}
        </div>
    );
}

export default Description;
