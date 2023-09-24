import { TfiDownload } from 'react-icons/tfi';
import { FaPlay } from 'react-icons/fa';
import { SlEye } from 'react-icons/sl';

import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Tooltip from '../../../components/Tooltip';
import DotMenu from '../../../components/DotMenu';
import MenuFixed from '../../../components/MenuFixed';
import useClickOutSide from '../../../hook/useClickOutSide';
import SkeletonLoading from '../../../components/SkeletonLoading';
import styles from './Left.module.css';
import useTimeConversion from '../../../hook/useTimeConversion';
import useNumberConversion from '../../../hook/useNumberConversion';
function Left({ isLoading, index, videoData, handleOpenModal }) {
    const menu = [
        {
            icon: <SlEye size={17} color="#000" />,
            text: 'Hiện những video không xem được',
        },
    ];
    const [elementRef, isShow, setShow] = useClickOutSide();
    const timeAgo = useTimeConversion(videoData?.vote_updated_at, 'ago');
    const numberConversion = useNumberConversion;
    return (
        <div className={clsx(styles.wrapper, { [styles.hidden]: !isLoading && !videoData })}>
            {isLoading ? (
                <SkeletonLoading />
            ) : (
                <>
                    <div className={clsx(styles.location)}>
                        <div className={clsx(styles.img)} onClick={() => handleOpenModal(index)}>
                            <div className={clsx(styles.aspectRatio)}>
                                <img src={videoData?.video_poster} />
                                <div className={clsx(styles.overlay)}>
                                    <FaPlay size={17} />
                                    <p>Phát ngay</p>
                                </div>
                            </div>
                        </div>
                        <div className={clsx(styles.info)}>
                            <div className={clsx(styles.text)}>
                                <div className={clsx(styles.title)}>
                                    <span>Video đã thích</span>
                                </div>
                                <div className={clsx(styles.name)}>
                                    <Link to={`/channel/${videoData?.user_id}/home`}>
                                        {videoData?.user_name}
                                    </Link>
                                    <Tooltip
                                        content={videoData?.user_name}
                                        customStyle={{
                                            bottom: 'calc(100%)',
                                            left: '50%',
                                            transform: 'translate(-50%,-50%)',
                                            whiteSpace: 'nowrap',
                                            fontSize: '1.1rem',
                                        }}
                                    />
                                </div>
                                <div className={clsx(styles.statistical)}>
                                    <p>
                                        {numberConversion(videoData?.video_views, 'compression')}{' '}
                                        lượt xem
                                    </p>
                                    <p>{`Đã thích video vào ${timeAgo}`}</p>
                                </div>
                            </div>
                            <div className={clsx(styles.actions)}>
                                <div className={clsx(styles.download)}>
                                    <Tooltip
                                        content={'Tải xuống'}
                                        customStyle={{
                                            top: 'calc(100% + 10px)',
                                            left: '10px',
                                            whiteSpace: 'nowrap',
                                            fontSize: '1.2rem',
                                        }}
                                    />
                                    <DotMenu icon={<TfiDownload size={17} />} />
                                </div>
                                <div
                                    className={clsx(styles.dot)}
                                    ref={elementRef}
                                    onClick={() => setShow(!isShow)}
                                >
                                    <DotMenu />
                                    {isShow && <MenuFixed isDisableScroll menulist={menu} />}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={clsx(styles.btns)}>
                        <button className={clsx(styles.btn)} onClick={() => handleOpenModal(index)}>
                            <FaPlay size={17} />
                            <span>Phát ngay</span>
                        </button>
                        <button className={clsx(styles.btn)} onClick={() => handleOpenModal(0)}>
                            <FaPlay size={17} />
                            <span>Phát từ đầu</span>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Left;
