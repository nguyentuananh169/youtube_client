import clsx from 'clsx';
import SkeletonLoading from '../SkeletonLoading';
import styles from './VideoCard.module.css';
import { useLocation } from 'react-router-dom';
function Loading({
    width,
    row = false,
    rowOwner = false,
    hidenOwner = false,
    isPreview = false,
    showDes = false,
}) {
    const { pathname } = useLocation();
    return (
        <div className={clsx(styles.videoCard, { [styles.row]: row, [styles.preview]: isPreview })}>
            <div className={clsx(styles.img)} style={{ width }}>
                <div className={clsx(styles.aspectRatio)}>
                    <SkeletonLoading />
                </div>
            </div>
            <div className={clsx(styles.details)}>
                {pathname === '/' && (
                    <div className={clsx(styles.channel)}>
                        <SkeletonLoading />
                    </div>
                )}
                <div className={clsx(styles.info)}>
                    <div className={clsx(styles.title)}>
                        <SkeletonLoading height="35px" />
                    </div>
                    <div
                        className={clsx(styles.ownerContainer, {
                            [styles.location]: pathname.includes('/search'),
                            [styles.row]: rowOwner,
                        })}
                    >
                        {!hidenOwner && (
                            <div className={clsx(styles.owner)}>
                                {pathname.includes('/search') && <SkeletonLoading width="0" />}

                                <SkeletonLoading height="20px" />
                            </div>
                        )}
                        <div className={clsx(styles.time)}>
                            <SkeletonLoading height="20px" />
                        </div>
                    </div>
                    {showDes && (
                        <div className={clsx(styles.des)}>
                            <SkeletonLoading height="30px" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Loading;
