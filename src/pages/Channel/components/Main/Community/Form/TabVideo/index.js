import { BiSearchAlt } from 'react-icons/bi';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import videoApi from '../../../../../../../api/videoApi';
import NoResult from '../../../../../../../components/NoResult';
import VideoCard from '../../../../../../../components/VideoCard';
import styles from './TabVideo.module.css';
import logo from '../../../../../../../assets/img/logo.png';
import VideoItem from './VideoItem';
function TabVideo({ handleCloseTab, valueForm, setValueForm }) {
    const inputRef = useRef(null);
    const [value, setValue] = useState('');
    const [indexActive, setIndexActive] = useState(null);
    const [videoList, setVideoList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [params, setParams] = useState({
        totalPage: 1,
        page: 1,
    });
    useEffect(() => {
        const inputEl = inputRef.current;
        if (inputEl) {
            inputRef.current.focus();
        }
    }, []);
    useEffect(() => {
        if (!valueForm.video_id) {
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = '';
            };
        }
    }, [valueForm.video_id]);
    const handleSearchVideo = async (type, initPage) => {
        const valueInput = value.trim();
        if (!valueInput || isLoading) {
            return;
        }
        setIsLoading(true);
        const formData = {
            type: 'get_by_token',
            search_type: 'title',
            keyword: valueInput,
            page: initPage || params.page,
        };
        const response = await videoApi.get(formData);
        if (type === 'hasMore') {
            setVideoList([...videoList, ...response.videoList]);
        } else {
            setVideoList(response.videoList);
            setIndexActive(null);
        }
        setParams({ page: response.page + 1, totalPage: response.totalPage });
        setIsLoading(false);
        setIsSubmit(true);
    };
    const handleSelect = () => {
        const item = videoList[indexActive];
        if (!item) {
            return;
        }
        setValueForm({ ...valueForm, video_id: item.video_id, videoItem: item });
    };
    return (
        <>
            {valueForm.video_id === '' ? (
                <div className={clsx(styles.overlay)}>
                    <div className={clsx(styles.wrapper, { [styles.loading]: isLoading })}>
                        <div className={clsx(styles.heading)}>
                            <h3>Thêm một video Youtube hiện có</h3>
                        </div>
                        <div className={clsx(styles.form)}>
                            <img src={logo} />
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Nhập nội dung"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                            <button
                                type="button"
                                className={clsx({ [styles.active]: value.trim() && !isLoading })}
                                onClick={() => handleSearchVideo(null, 1)}
                            >
                                <BiSearchAlt size={17} />
                            </button>
                        </div>
                        <div className={clsx(styles.body)}>
                            {!isSubmit && (
                                <span className={clsx(styles.text)}>
                                    Nhập nội dung tìm kiếm của bạn vào hộp phía trên để tìm kiếm
                                    video
                                </span>
                            )}
                            {!isLoading && isSubmit && videoList.length === 0 && (
                                <div className={clsx(styles.noResult)}>
                                    <NoResult />
                                </div>
                            )}
                            {isSubmit &&
                                videoList.length > 0 &&
                                videoList.map((item, index) => (
                                    <div
                                        key={item.video_id}
                                        className={clsx(styles.videoCard, {
                                            [styles.active]: indexActive === index,
                                        })}
                                        onClick={() => setIndexActive(index)}
                                    >
                                        <VideoCard
                                            item={item}
                                            row
                                            width="170px"
                                            url="#"
                                            hidenDotMenu
                                            hidenOwner
                                        />
                                    </div>
                                ))}
                            {params.page <= params.totalPage && isSubmit && (
                                <div className={clsx(styles.hasMore)}>
                                    <button
                                        type="button"
                                        className={clsx({ [styles.loading]: isLoading })}
                                        onClick={() => handleSearchVideo('hasMore')}
                                    >
                                        {isLoading ? 'Đang tải ...' : 'Xem thêm'}
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className={clsx(styles.bottom)}>
                            <button
                                type="button"
                                className={clsx({ [styles.active]: indexActive !== null })}
                                onClick={handleSelect}
                            >
                                Chọn
                            </button>
                            <button type="button" onClick={() => handleCloseTab('video_id')}>
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <VideoItem handleCloseTab={handleCloseTab} item={valueForm.videoItem} />
            )}
        </>
    );
}

export default TabVideo;
