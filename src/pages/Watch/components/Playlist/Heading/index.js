import { TfiAngleUp, TfiAngleDown } from 'react-icons/tfi';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import playlistApi from '../../../../../api/playlistApi';
import DotMenu from '../../../../../components/DotMenu';
import styles from './Heading.module.css';
import SkeletonLoading from '../../../../../components/SkeletonLoading';
function Heading({ loadingPage, urlParams, userName, userTag, isCollapse, setIsCollapse }) {
    const [isLoading, setIsLoading] = useState(true);
    const [playlist, setPlaylist] = useState({});

    useEffect(() => {
        if (urlParams.list) {
            const fetchPlaylist = async () => {
                setIsLoading(true);
                const formData = {
                    type: 'get_by_id',
                    keyword: urlParams.list,
                };
                const response = await playlistApi.get(formData);
                if (response.playlist.length !== 0) {
                    setPlaylist({
                        id: response.playlist[0].playlist_id,
                        name: response.playlist[0].playlist_name,
                        totalVideo: response.playlist[0].total_video,
                    });
                }
                setIsLoading(false);
            };
            fetchPlaylist();
        }
    }, [urlParams.list]);
    return (
        <div className={clsx(styles.heading)}>
            {!isLoading && !playlist.id ? (
                <div className={clsx(styles.error)}>
                    <span>Rất tiếc! Đã xảy ra lỗi</span>
                </div>
            ) : (
                <>
                    <div className={clsx(styles.name)}>
                        {isLoading || loadingPage ? (
                            <SkeletonLoading width="100%" height="35px" />
                        ) : (
                            <>
                                <h3>{playlist.name || '...'}</h3>
                                <Link to={`/channel/${userTag}/home`}>{userName}</Link>
                                <span>
                                    {' '}
                                    - {urlParams.index || 1}/{playlist.totalVideo}
                                </span>
                            </>
                        )}
                    </div>
                    <div className={clsx(styles.close)} onClick={() => setIsCollapse(!isCollapse)}>
                        <DotMenu
                            icon={
                                isCollapse ? (
                                    <TfiAngleDown size={20} />
                                ) : (
                                    <TfiAngleUp size={20} color="#333" />
                                )
                            }
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export default Heading;
