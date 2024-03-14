import { ArrowLeft } from 'react-feather';

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import VideoCard from './VideoCard';
import Loading from './VideoCard/Loading';
import videoApi from '../../api/videoApi';
import LoadingHasMore from '../../components/LoadingHasMore';
import NoResult from '../../components/NoResult';
import styles from './Shorts.module.css';
function Shorts() {
    const itemList = [
        {
            category_id: '6',
            playlist_id: '0',
            playlist_update_time: '',
            user_avatar:
                'https://tuannguyen.click/images/user/1709802786364632151_1497634937737162_7119376630577859435_n.jpg',
            user_id: '51',
            user_name: 'Trương Văn Thành',
            user_tag: '@TruongVanThanh',
            user_total_subscribe: '1',
            video_cmt: '0',
            video_created_at: '2024-03-08 11:08:21',
            video_des: '',
            video_dislike: '0',
            video_duration: '60.1',
            video_id: '1',
            video_like: '0',
            video_link:
                'https://res.cloudinary.com/dm4utvg9k/video/upload/v1709874947/videos/SnapTik_App_7342492988217642248-HD_nlt0fn.mov',
            video_public_id: 'videos/vl9pxkc4wfgtruvjp6st',
            video_title:
                'Cận cảnh màn rượt đuổi quá kịch tính giữa ĐT nữ Tây Ban Nha - Thụy Điển I Bán kết World Cup 2023',
            video_updated_at: '2024-03-08 11:08:21',
            video_views: '10021456',
        },
        {
            category_id: '6',
            playlist_id: '0',
            playlist_update_time: '',
            user_avatar:
                'https://tuannguyen.click/images/user/1709802786364632151_1497634937737162_7119376630577859435_n.jpg',
            user_id: '51',
            user_name: 'Trương Văn Thành',
            user_tag: '@TruongVanThanh',
            user_total_subscribe: '1',
            video_cmt: '0',
            video_created_at: '2024-03-08 11:08:21',
            video_des: '',
            video_dislike: '0',
            video_duration: '60.1',
            video_id: '2',
            video_like: '0',
            video_link:
                'https://res.cloudinary.com/dm4utvg9k/video/upload/v1709885586/videos/Download_13_iwywwq.mp4',
            video_public_id: 'videos/vl9pxkc4wfgtruvjp6st',
            video_title:
                'Cận cảnh màn rượt đuổi quá kịch tính giữa ĐT nữ Tây Ban Nha - Thụy Điển I Bán kết World Cup 2023',
            video_updated_at: '2024-03-08 11:08:21',
            video_views: '10021456',
        },
        {
            category_id: '6',
            playlist_id: '0',
            playlist_update_time: '',
            user_avatar:
                'https://tuannguyen.click/images/user/1709802786364632151_1497634937737162_7119376630577859435_n.jpg',
            user_id: '51',
            user_name: 'Trương Văn Thành',
            user_tag: '@TruongVanThanh',
            user_total_subscribe: '1',
            video_cmt: '0',
            video_created_at: '2024-03-08 11:08:21',
            video_des: '',
            video_dislike: '0',
            video_duration: '60.1',
            video_id: '3',
            video_like: '0',
            video_link:
                'https://res.cloudinary.com/dm4utvg9k/video/upload/v1709885589/videos/Download_8_p81p9p.mp4',
            video_public_id: 'videos/vl9pxkc4wfgtruvjp6st',
            video_title:
                'Cận cảnh màn rượt đuổi quá kịch tính giữa ĐT nữ Tây Ban Nha - Thụy Điển I Bán kết World Cup 2023',
            video_updated_at: '2024-03-08 11:08:21',
            video_views: '10021456',
        },
        {
            category_id: '6',
            playlist_id: '0',
            playlist_update_time: '',
            user_avatar:
                'https://tuannguyen.click/images/user/1709802786364632151_1497634937737162_7119376630577859435_n.jpg',
            user_id: '51',
            user_name: 'Trương Văn Thành',
            user_tag: '@TruongVanThanh',
            user_total_subscribe: '1',
            video_cmt: '0',
            video_created_at: '2024-03-08 11:08:21',
            video_des: '',
            video_dislike: '0',
            video_duration: '60.1',
            video_id: '4',
            video_like: '0',
            video_link:
                'https://res.cloudinary.com/dm4utvg9k/video/upload/v1709885590/videos/Download_12_i3tx5r.mp4',
            video_public_id: 'videos/vl9pxkc4wfgtruvjp6st',
            video_title:
                'Cận cảnh màn rượt đuổi quá kịch tính giữa ĐT nữ Tây Ban Nha - Thụy Điển I Bán kết World Cup 2023',
            video_updated_at: '2024-03-08 11:08:21',
            video_views: '10021456',
        },
        {
            category_id: '6',
            playlist_id: '0',
            playlist_update_time: '',
            user_avatar:
                'https://tuannguyen.click/images/user/1709802786364632151_1497634937737162_7119376630577859435_n.jpg',
            user_id: '51',
            user_name: 'Trương Văn Thành',
            user_tag: '@TruongVanThanh',
            user_total_subscribe: '1',
            video_cmt: '0',
            video_created_at: '2024-03-08 11:08:21',
            video_des: '',
            video_dislike: '0',
            video_duration: '60.1',
            video_id: '5',
            video_like: '0',
            video_link:
                'https://res.cloudinary.com/dm4utvg9k/video/upload/v1709885590/videos/Download_6_zti58f.mp4',
            video_public_id: 'videos/vl9pxkc4wfgtruvjp6st',
            video_title:
                'Cận cảnh màn rượt đuổi quá kịch tính giữa ĐT nữ Tây Ban Nha - Thụy Điển I Bán kết World Cup 2023',
            video_updated_at: '2024-03-08 11:08:21',
            video_views: '10021456',
        },
        {
            category_id: '6',
            playlist_id: '0',
            playlist_update_time: '',
            user_avatar:
                'https://tuannguyen.click/images/user/1709802786364632151_1497634937737162_7119376630577859435_n.jpg',
            user_id: '51',
            user_name: 'Trương Văn Thành',
            user_tag: '@TruongVanThanh',
            user_total_subscribe: '1',
            video_cmt: '0',
            video_created_at: '2024-03-08 11:08:21',
            video_des: '',
            video_dislike: '0',
            video_duration: '60.1',
            video_id: '6',
            video_like: '0',
            video_link:
                'https://res.cloudinary.com/dm4utvg9k/video/upload/v1709885591/videos/Download_5_crjujz.mp4',
            video_public_id: 'videos/vl9pxkc4wfgtruvjp6st',
            video_title:
                'Cận cảnh màn rượt đuổi quá kịch tính giữa ĐT nữ Tây Ban Nha - Thụy Điển I Bán kết World Cup 2023',
            video_updated_at: '2024-03-08 11:08:21',
            video_views: '10021456',
        },
        {
            category_id: '6',
            playlist_id: '0',
            playlist_update_time: '',
            user_avatar:
                'https://tuannguyen.click/images/user/1709802786364632151_1497634937737162_7119376630577859435_n.jpg',
            user_id: '51',
            user_name: 'Trương Văn Thành',
            user_tag: '@TruongVanThanh',
            user_total_subscribe: '1',
            video_cmt: '0',
            video_created_at: '2024-03-08 11:08:21',
            video_des: '',
            video_dislike: '0',
            video_duration: '60.1',
            video_id: '7',
            video_like: '0',
            video_link:
                'https://res.cloudinary.com/dm4utvg9k/video/upload/v1709885591/videos/Download_7_bjih76.mp4',
            video_public_id: 'videos/vl9pxkc4wfgtruvjp6st',
            video_title:
                'Cận cảnh màn rượt đuổi quá kịch tính giữa ĐT nữ Tây Ban Nha - Thụy Điển I Bán kết World Cup 2023',
            video_updated_at: '2024-03-08 11:08:21',
            video_views: '10021456',
        },
        {
            category_id: '6',
            playlist_id: '0',
            playlist_update_time: '',
            user_avatar:
                'https://tuannguyen.click/images/user/1709802786364632151_1497634937737162_7119376630577859435_n.jpg',
            user_id: '51',
            user_name: 'Trương Văn Thành',
            user_tag: '@TruongVanThanh',
            user_total_subscribe: '1',
            video_cmt: '0',
            video_created_at: '2024-03-08 11:08:21',
            video_des: '',
            video_dislike: '0',
            video_duration: '60.1',
            video_id: '8',
            video_like: '0',
            video_link:
                'https://res.cloudinary.com/dm4utvg9k/video/upload/v1709885591/videos/Download_10_cftbar.mp4',
            video_public_id: 'videos/vl9pxkc4wfgtruvjp6st',
            video_title:
                'Cận cảnh màn rượt đuổi quá kịch tính giữa ĐT nữ Tây Ban Nha - Thụy Điển I Bán kết World Cup 2023',
            video_updated_at: '2024-03-08 11:08:21',
            video_views: '10021456',
        },
        {
            category_id: '6',
            playlist_id: '0',
            playlist_update_time: '',
            user_avatar:
                'https://tuannguyen.click/images/user/1709802786364632151_1497634937737162_7119376630577859435_n.jpg',
            user_id: '51',
            user_name: 'Trương Văn Thành',
            user_tag: '@TruongVanThanh',
            user_total_subscribe: '1',
            video_cmt: '0',
            video_created_at: '2024-03-08 11:08:21',
            video_des: '',
            video_dislike: '0',
            video_duration: '60.1',
            video_id: '9',
            video_like: '0',
            video_link:
                'https://res.cloudinary.com/dm4utvg9k/video/upload/v1709885595/videos/Download_1_hd6ntn.mp4',
            video_public_id: 'videos/vl9pxkc4wfgtruvjp6st',
            video_title:
                'Cận cảnh màn rượt đuổi quá kịch tính giữa ĐT nữ Tây Ban Nha - Thụy Điển I Bán kết World Cup 2023',
            video_updated_at: '2024-03-08 11:08:21',
            video_views: '10021456',
        },
        {
            category_id: '6',
            playlist_id: '0',
            playlist_update_time: '',
            user_avatar:
                'https://tuannguyen.click/images/user/1709802786364632151_1497634937737162_7119376630577859435_n.jpg',
            user_id: '51',
            user_name: 'Trương Văn Thành',
            user_tag: '@TruongVanThanh',
            user_total_subscribe: '1',
            video_cmt: '0',
            video_created_at: '2024-03-08 11:08:21',
            video_des: '',
            video_dislike: '0',
            video_duration: '60.1',
            video_id: '10',
            video_like: '0',
            video_link:
                'https://res.cloudinary.com/dm4utvg9k/video/upload/v1709885600/videos/Download_9_fvmvzb.mp4',
            video_public_id: 'videos/vl9pxkc4wfgtruvjp6st',
            video_title:
                'Cận cảnh màn rượt đuổi quá kịch tính giữa ĐT nữ Tây Ban Nha - Thụy Điển I Bán kết World Cup 2023',
            video_updated_at: '2024-03-08 11:08:21',
            video_views: '10021456',
        },
        {
            category_id: '6',
            playlist_id: '0',
            playlist_update_time: '',
            user_avatar:
                'https://tuannguyen.click/images/user/1709802786364632151_1497634937737162_7119376630577859435_n.jpg',
            user_id: '51',
            user_name: 'Trương Văn Thành',
            user_tag: '@TruongVanThanh',
            user_total_subscribe: '1',
            video_cmt: '0',
            video_created_at: '2024-03-08 11:08:21',
            video_des: '',
            video_dislike: '0',
            video_duration: '60.1',
            video_id: '11',
            video_like: '0',
            video_link:
                'https://res.cloudinary.com/dm4utvg9k/video/upload/v1709885601/videos/Download_2_bleris.mp4',
            video_public_id: 'videos/vl9pxkc4wfgtruvjp6st',
            video_title:
                'Cận cảnh màn rượt đuổi quá kịch tính giữa ĐT nữ Tây Ban Nha - Thụy Điển I Bán kết World Cup 2023',
            video_updated_at: '2024-03-08 11:08:21',
            video_views: '10021456',
        },
        {
            category_id: '6',
            playlist_id: '0',
            playlist_update_time: '',
            user_avatar:
                'https://tuannguyen.click/images/user/1709802786364632151_1497634937737162_7119376630577859435_n.jpg',
            user_id: '51',
            user_name: 'Trương Văn Thành',
            user_tag: '@TruongVanThanh',
            user_total_subscribe: '1',
            video_cmt: '0',
            video_created_at: '2024-03-08 11:08:21',
            video_des: '',
            video_dislike: '0',
            video_duration: '60.1',
            video_id: '12',
            video_like: '0',
            video_link:
                'https://res.cloudinary.com/dm4utvg9k/video/upload/v1709885610/videos/Download_3_fqryd1.mp4',
            video_public_id: 'videos/vl9pxkc4wfgtruvjp6st',
            video_title:
                'Cận cảnh màn rượt đuổi quá kịch tính giữa ĐT nữ Tây Ban Nha - Thụy Điển I Bán kết World Cup 2023',
            video_updated_at: '2024-03-08 11:08:21',
            video_views: '10021456',
        },

        {
            category_id: '6',
            playlist_id: '0',
            playlist_update_time: '',
            user_avatar:
                'https://tuannguyen.click/images/user/1709802786364632151_1497634937737162_7119376630577859435_n.jpg',
            user_id: '51',
            user_name: 'Trương Văn Thành',
            user_tag: '@TruongVanThanh',
            user_total_subscribe: '1',
            video_cmt: '0',
            video_created_at: '2024-03-08 11:08:21',
            video_des: '',
            video_dislike: '0',
            video_duration: '60.1',
            video_id: '13',
            video_like: '0',
            video_link:
                'https://res.cloudinary.com/dm4utvg9k/video/upload/v1709885612/videos/Download_4_u8enjp.mp4',
            video_public_id: 'videos/vl9pxkc4wfgtruvjp6st',
            video_title:
                'Cận cảnh màn rượt đuổi quá kịch tính giữa ĐT nữ Tây Ban Nha - Thụy Điển I Bán kết World Cup 2023',
            video_updated_at: '2024-03-08 11:08:21',
            video_views: '10021456',
        },
    ];
    const wrapperRef = useRef(null);
    const isReset = useRef(true);
    const [isMute, setIsMute] = useState(false);
    const [isLoadingFirst, setIsLoadingFirst] = useState(true);
    const [isHasMore, setIsHasMore] = useState(false);
    const [params, setParams] = useState({
        page: 1,
        limit: 10,
        totalPage: 1,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [videoList, setVideoList] = useState([]);
    const handleSetMute = () => {
        setIsMute(!isMute);
    };
    const fetchVideoList = async () => {
        setIsLoading(true);
        const formData = {
            type: 'video_type',
            search_type: 1,
            limit: params.limit,
            page: params.page,
        };
        const response = await videoApi.get(formData);
        setIsLoading(false);
        setIsLoadingFirst(false);
        if (isReset.current) {
            setVideoList(response.videoList);
        } else {
            setVideoList([...videoList, ...response.videoList]);
        }
        setParams({
            page: response.page + 1,
            limit: response.limit,
            totalPage: response.totalPage,
        });
        setIsHasMore(false);
        isReset.current = false;
    };
    useEffect(() => {
        fetchVideoList();
    }, []);
    const handleInfiniteScroll = async () => {
        if (wrapperRef.current) {
            const wrapperEl = wrapperRef.current;
            const scroll = document.body.scrollTop || document.documentElement.scrollTop;
            const screenHeight = window.innerHeight;
            const scrollHeight = Math.floor(scroll + screenHeight);
            const clientHeight = Math.floor(
                wrapperEl.getBoundingClientRect().top + window.scrollY + wrapperEl.clientHeight,
            );
            if (scrollHeight + screenHeight >= clientHeight) {
                setIsHasMore(true);
            }
        }
    };
    useEffect(() => {
        if (isHasMore && !isLoading && !isLoadingFirst && params.page <= params.totalPage) {
            fetchVideoList();
        }
    }, [isHasMore]);
    useEffect(() => {
        window.addEventListener('scroll', handleInfiniteScroll);
        return () => {
            window.removeEventListener('scroll', handleInfiniteScroll);
        };
    }, []);

    return (
        <div className={clsx(styles.wrapper)} ref={wrapperRef}>
            <Link to={'/'} className={clsx(styles.goHome)}>
                <ArrowLeft size={20} color="#fff" />
            </Link>
            {isLoading && isLoadingFirst && <Loading />}
            {videoList.map((item) => (
                <VideoCard
                    key={item.video_id}
                    item={item}
                    handleSetMute={handleSetMute}
                    isMute={isMute}
                />
            ))}
            {isLoading && !isLoadingFirst && isHasMore && (
                <LoadingHasMore customStyle={{ marginTop: '10px', paddingBottom: '10px' }} />
            )}
            {!isLoading && !isLoadingFirst && videoList.length === 0 && (
                <div className={clsx(styles.noResult)}>
                    <NoResult text="Không có video ngắn nào" />
                </div>
            )}
        </div>
    );
}

export default Shorts;
