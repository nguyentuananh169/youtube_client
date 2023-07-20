import clsx from 'clsx';
import VideoCard from '../../../../components/VideoCard';
import styles from './VideoList.module.css';
import FilterSlider from '../../../../components/FilterSlider';
import { useEffect, useState } from 'react';
function VideoList() {
    const data = [
        'Tất cả',
        'Âm nhạc',
        'Trò chơi',
        'Danh sách kết hợp',
        'Trực tiếp',
        'Hài kịch tình huống',
        'Trò chơi hành động phưu lưu',
        'Bóng đá',
        'Đọc rap',
        'Nấu ăn',
        'Hoạt hình',
        'Mới tải lên gần đây',
        'Đều xuất mới',
    ];
    const [isVideoColumn, setIsVideoColumn] = useState(false);
    const [width, setWidth] = useState(null);
    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth <= 1024 && screenWidth > 768) {
                setIsVideoColumn(true);
                setWidth('33.333%');
            } else if (screenWidth <= 768 && screenWidth > 520) {
                setIsVideoColumn(true);
                setWidth('50%');
            } else if (screenWidth <= 520) {
                setIsVideoColumn(true);
                setWidth('100%');
            } else {
                setIsVideoColumn(false);
                setWidth('100%');
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div className={clsx(styles.wrapper)}>
            <div style={{ width: '100%' }}>
                <FilterSlider itemList={data} />
            </div>
            {/* <FilterCategory /> */}
            <div className={clsx(styles.videoList, { [styles.videoColumn]: isVideoColumn })}>
                {Array(10)
                    .fill(0)
                    .map((item, index) => (
                        <div
                            key={index}
                            className={clsx(styles.card)}
                            style={{ width: `calc(${width} - 5px)` }}
                        >
                            <VideoCard
                                width={`${isVideoColumn ? '100%' : '168px'}`}
                                row={!isVideoColumn}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default VideoList;
