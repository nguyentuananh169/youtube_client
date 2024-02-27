import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import videoApi from '../../../../../api/videoApi';
import Item from './Item';
import { nextVideoInfo } from '../../../../../store/actions/nextVideoInfo';
import ItemLoading from './Item/Loading';
import styles from './Body.module.css';
function Body({ urlParams, isCollapse, loadingPage }) {
    const [isLoading, setIsLoading] = useState(true);
    const [videoList, setVideoList] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        if (urlParams.list) {
            const fetchVideoList = async () => {
                setIsLoading(true);
                const formData = {
                    type: 'playlist_id',
                    id: urlParams.list,
                    order_by: 'playlist_update_time',
                    order_type: 'ASC',
                    is_unlimited: true,
                };
                const response = await videoApi.get(formData);
                setIsLoading(false);
                setVideoList(response.videoList);
            };
            fetchVideoList();
        }
    }, [urlParams.list]);
    useEffect(() => {
        if (!loadingPage) {
            let index;
            if (urlParams.index) {
                index = urlParams.index;
            } else {
                const i = videoList.findIndex((item) => item.video_id === urlParams.id);
                index = i + 1;
            }
            const data = videoList[index];
            dispatch(
                nextVideoInfo({
                    type: 'playlist',
                    id: data?.video_id,
                    categoryId: data?.category_id,
                    title: data?.video_title,
                    poster: data?.video_poster,
                    userName: data?.user_name,
                    playlist: data?.playlist_id,
                    index: +index + 1,
                }),
            );
        }
    }, [loadingPage, videoList]);
    return (
        <div className={clsx(styles.body, { [styles.collapse]: isCollapse })}>
            {!isLoading &&
                !loadingPage &&
                videoList.map((item, index) => (
                    <Item
                        key={item.video_id}
                        item={item}
                        count={index + 1}
                        active={urlParams.id === item.video_id}
                    />
                ))}
            {(isLoading || loadingPage) &&
                Array(3)
                    .fill(0)
                    .map((item, index) => <ItemLoading key={index} />)}
        </div>
    );
}

export default Body;
