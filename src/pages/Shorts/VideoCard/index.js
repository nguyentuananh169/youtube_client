import { Volume2, VolumeX } from 'react-feather';

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import VideoPlay from './VideoPlay';
import subscriptionApi from '../../../api/subscriptionApi';
import Actions from './Actions';
import NoAvatar from '../../../components/NoAvatar';
import Comments from './Comments';
import Description from './Description';
import { addToastMessage } from '../../../store/actions/toastMessage';
import styles from './VideoCard.module.css';
function VideoCard({ item, handleSetMute, isMute }) {
    const videoRef = useRef(null);
    const posterRef = useRef(null);
    const timeoutRef = useRef(null);
    const [isSubscribed, setIsSubscribed] = useState(item.is_subscribed);
    const [isLoading, setIsLoading] = useState(false);
    const [isMore, setIsMore] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isShowComment, setIsShowComment] = useState(false);
    const [isShowDes, setIsShowDes] = useState(false);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (posterRef.current) {
            const handleScroll = () => {
                videoRef.current && videoRef.current.pause();
                const isMobile = window.innerWidth <= 768;
                const pageYOffset = isMobile ? window.pageYOffset : window.pageYOffset - 72;
                const posterEl = posterRef.current;
                const top = posterEl.getBoundingClientRect().top + pageYOffset;
                const bottom = posterEl.getBoundingClientRect().bottom + pageYOffset;
                const height = posterEl.getBoundingClientRect().height;
                const scrollTop = isMobile
                    ? document.body.scrollTop || document.documentElement.scrollTop
                    : (document.body.scrollTop || document.documentElement.scrollTop) + 72;

                const h = height / 2;
                const t = isMobile ? top : top - 20;

                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
                timeoutRef.current = setTimeout(() => {
                    if (scrollTop >= t - h && scrollTop <= bottom - h) {
                        handleScrollTop(top);
                        setIsVisible(true);
                    } else {
                        setIsVisible(false);
                    }
                }, 300);
            };
            handleScroll();
            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);
    useEffect(() => {
        if (isShowComment || isShowDes) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isShowComment, isShowDes]);

    const handleScrollTop = (distanceFromTop) => {
        window.scrollTo(0, distanceFromTop);
        videoRef.current && videoRef.current.play();
    };
    const handleSetShowComment = () => {
        setIsShowComment(!isShowComment);
        setIsShowDes(false);
    };
    const handleSetShowDes = () => {
        setIsShowDes(!isShowDes);
        setIsShowComment(false);
    };
    const handleClickSubscription = async () => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);
        const formData = new FormData();
        formData.append('_id', item.user_id);
        const response = isSubscribed
            ? await subscriptionApi.unsubscribe(formData)
            : await subscriptionApi.subscribe(formData);
        setIsLoading(false);
        if (response[0].error) {
            return dispatch(addToastMessage('error', '', response[0].message));
        }
        setIsSubscribed(!isSubscribed);
        dispatch(addToastMessage('success', '', response[0].message));
    };
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.comments, { [styles.show]: isShowComment })}>
                {isShowComment && (
                    <Comments
                        videoId={item.video_id}
                        ownerId={item.user_id}
                        ownerName={item.user_name}
                        ownerAvatar={item.user_avatar}
                        handleSetShowComment={handleSetShowComment}
                    />
                )}
            </div>
            <div className={clsx(styles.des, { [styles.show]: isShowDes })}>
                {isShowDes && <Description item={item} handleSetShowDes={handleSetShowDes} />}
            </div>
            <div
                className={clsx(styles.container, {
                    [styles.translateX]: isShowComment || isShowDes,
                })}
            >
                <Actions
                    item={item}
                    isShowComment={isShowComment}
                    isShowDes={isShowDes}
                    handleSetShowDes={handleSetShowDes}
                    handleSetShowComment={handleSetShowComment}
                />
                <div className={clsx(styles.aspectRatio)}>
                    <div className={clsx(styles.mute)} onClick={handleSetMute}>
                        {isMute ? <VolumeX /> : <Volume2 />}
                    </div>
                    <img className={clsx(styles.poster)} ref={posterRef} src={item.video_poster} />
                    {isVisible && (
                        <VideoPlay
                            videoId={item.video_id}
                            videoLink={item.video_link}
                            isMute={isMute}
                            videoRef={videoRef}
                        />
                    )}
                    <div className={clsx(styles.meta)}>
                        <div className={clsx(styles.author)}>
                            <div className={clsx(styles.userAvatar)}>
                                <Link to={`/channel/${item.user_id}/home`}></Link>
                                {item.user_avatar ? (
                                    <img src={item.user_avatar} />
                                ) : (
                                    <NoAvatar
                                        userName={item.user_name}
                                        customStyles={{ fontSize: '2rem' }}
                                    />
                                )}
                            </div>
                            <div className={clsx(styles.userTag)}>
                                <Link to={`/channel/${item.user_id}/home`}>{item.user_tag}</Link>
                            </div>
                            {auth.isLogin &&
                                auth.user?.user_id &&
                                auth.user?.user_id !== item.user_id && (
                                    <div
                                        className={clsx(
                                            styles.subscription,
                                            { [styles.unsub]: isSubscribed },
                                            { [styles.load]: isLoading },
                                        )}
                                        onClick={handleClickSubscription}
                                    >
                                        <span>{isSubscribed ? 'Hủy đăng ký' : 'Đăng ký'}</span>
                                        {isLoading && <p className={clsx(styles.spiner)}></p>}
                                    </div>
                                )}
                        </div>
                        <div
                            className={clsx(styles.title, { [styles.more]: isMore })}
                            onClick={() => setIsMore(!isMore)}
                        >
                            {item.video_title}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoCard;
