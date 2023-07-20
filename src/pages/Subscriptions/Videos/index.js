import { RiLayoutGridFill, RiListUnordered } from 'react-icons/ri';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import VideoCard from '../../../components/VideoCard';
import DotMenu from '../../../components/DotMenu';
import Tooltip from '../../../components/Tooltip';
import styles from './Videos.module.css';
function Videos() {
    const [isLayoutGird, setIsLayoutGird] = useState(false);
    const [isLayoutGird2, setIsLayoutGird2] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsLayoutGird2(true);
            } else {
                setIsLayoutGird2(false);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div className={clsx(styles.wrapper, { [styles.gird]: isLayoutGird })}>
            <div className={clsx(styles.sort)}>
                <div className={clsx(styles.link)}>
                    <Link to={'/subscriptions/channels'}>Quản lý</Link>
                </div>
                <div className={clsx(styles.icon)} onClick={() => setIsLayoutGird(true)}>
                    <Tooltip
                        content={'Lưới'}
                        customStyle={{
                            top: 'calc(100% + 20px)',
                            left: '50%',
                            transform: 'translate(-50%,-50%)',
                            fontSize: '1.2rem',
                            padding: '8px 7px',
                            zIndex: 1,
                        }}
                    />
                    <DotMenu
                        icon={
                            <RiLayoutGridFill
                                size={20}
                                color={isLayoutGird ? '#0d0d0d' : '#A4A4A4'}
                            />
                        }
                    />
                </div>
                <div className={clsx(styles.icon)} onClick={() => setIsLayoutGird(false)}>
                    <Tooltip
                        content={'Danh sách'}
                        customStyle={{
                            top: 'calc(100% + 20px)',
                            left: '50%',
                            transform: 'translate(-50%,-50%)',
                            fontSize: '1.2rem',
                            padding: '8px 7px',
                            whiteSpace: 'nowrap',
                            zIndex: 1,
                        }}
                    />
                    <DotMenu
                        icon={
                            <RiListUnordered
                                size={20}
                                color={isLayoutGird ? '#A4A4A4' : '#0d0d0d'}
                            />
                        }
                    />
                </div>
            </div>
            <div className={clsx(styles.cardWrapper)}>
                {Array(10)
                    .fill(0)
                    .map((item, index) => (
                        <div key={index} className={clsx(styles.cardContainer)}>
                            <div className={clsx(styles.card)}>
                                <div className={clsx(styles.channel)}>
                                    <Link to={'#'}>
                                        <img src="https://yt3.ggpht.com/ytc/AGIKgqOJxNDFHMyR6HRrkR_ZUjpVshQOu2XZpiDlKCKc=s88-c-k-c0x00ffffff-no-rj" />
                                        <strong>ZendVN - Học Lập Trình Online</strong>
                                    </Link>
                                </div>

                                <div className={clsx(styles.video)}>
                                    <VideoCard
                                        isPreview
                                        row={!isLayoutGird && !isLayoutGird2}
                                        width={!isLayoutGird && !isLayoutGird2 ? '246px' : null}
                                        rowOwner={!isLayoutGird && !isLayoutGird2}
                                        showDes={!isLayoutGird && !isLayoutGird2}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Videos;
