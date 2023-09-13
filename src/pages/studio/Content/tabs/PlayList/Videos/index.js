import { TfiClose } from 'react-icons/tfi';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import videoApi from '../../../../../../api/videoApi';
import styles from './Videos.module.css';
import Tooltip from '../../../../../../components/Tooltip';
import Item from './Item';
import NoResult from '../../../../../../components/NoResult';
import Loading from './Loading';
function Videos({ playlistId = '', handleCloseModal }) {
    const [isLoading, setIsLoading] = useState(true);
    const [videoList, setVideoList] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [params, setParams] = useState({
        limit: 10,
        page: 0,
        totalPage: 1,
    });
    const fetchVideo = async () => {
        setIsLoading(true);
        const obj = {
            type: 'playlist_id',
            id: playlistId,
            order_by: 'playlist_update_time',
            order_type: 'ASC',
            page: params.page + 1,
            limit: params.limit,
        };
        const response = await videoApi.get(obj);
        setIsLoading(false);
        setHasMore(false);
        if (response.videoList.length) {
            setVideoList([...videoList, ...response.videoList]);
        }
        setParams({
            ...params,
            page: response.page,
            totalPage: response.totalPage,
            totalVideo: response.totalVideo,
        });
    };
    useEffect(() => {
        if (playlistId !== '') {
            fetchVideo();
        }
    }, [playlistId]);
    useEffect(() => {
        if (hasMore && !isLoading && params.page < params.totalPage) {
            fetchVideo();
        }
    }, [hasMore]);
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.modal)}>
                <div className={clsx(styles.heading)}>
                    <h3>
                        Video trong danh sách phát{' '}
                        {!isLoading && params?.totalVideo && `(${params.totalVideo})`}
                    </h3>
                    <button onClick={handleCloseModal}>
                        <TfiClose size={17} />
                        <Tooltip
                            content={'Đóng'}
                            customStyle={{
                                left: '50%',
                                top: 'calc(100% + 23px)',
                                transform: 'translate(-50%,-50%)',
                            }}
                        />
                    </button>
                </div>
                <div className={clsx(styles.body)}>
                    {isLoading &&
                        !hasMore &&
                        Array(2)
                            .fill(0)
                            .map((item, index) => <Loading key={index} />)}
                    {!isLoading && !hasMore && videoList.length === 0 && (
                        <NoResult text="Không có video nào trong danh sách phát này" />
                    )}
                    {videoList.map((item, index) => (
                        <Item key={item.video_id} item={item} stt={index + 1} />
                    ))}
                    {params.page > 0 && params.page < params.totalPage && (
                        <div className={clsx(styles.more, { [styles.loading]: isLoading })}>
                            <button onClick={() => setHasMore(true)}>
                                {isLoading
                                    ? 'Đang tải...'
                                    : `Xem thêm (${
                                          params.totalVideo - videoList.length > params.limit
                                              ? params.limit
                                              : params.totalVideo - videoList.length
                                      })`}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Videos;
